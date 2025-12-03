-- Criar tabela users no Supabase
-- Execute este SQL no Supabase SQL Editor

-- Tabela users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar índice para email (melhora performance)
CREATE INDEX idx_users_email ON users(email);

-- Adicionar política de segurança RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Permitir que qualquer pessoa autenticada leia a tabela users
CREATE POLICY "Usuários autenticados podem ler usuários"
  ON users FOR SELECT
  USING (auth.role() = 'authenticated');

-- Permitir que apenas admins atualizem o status de admin
CREATE POLICY "Apenas admins podem atualizar admin status"
  ON users FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE is_admin = TRUE
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM users WHERE is_admin = TRUE
    )
  );

-- Permitir que usuários atualizem seus próprios dados (exceto is_admin)
CREATE POLICY "Usuários podem atualizar seus próprios dados"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Permitir que qualquer pessoa autenticada insira um novo usuário
CREATE POLICY "Usuários autenticados podem inserir usuários"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Função trigger para sincronizar novo usuário quando fizer sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, username, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'username',
    COALESCE((NEW.raw_user_meta_data->>'admin')::boolean, FALSE)
  );
  RETURN NEW;
END;
$$;

-- Trigger para executar a função quando novo usuário é criado
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
