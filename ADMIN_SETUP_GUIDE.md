# 📋 Configuração do Sistema de Admin

## ✅ O que foi implementado

Um sistema completo de administração que permite promover usuários a admins usando a tabela `users` no Supabase (sem precisar de service role key).

## 🔧 Passo a passo para configurar

### 1. Criar a tabela `users` no Supabase

1. Acesse seu projeto Supabase
2. Vá para **SQL Editor**
3. Clique em **New Query**
4. Copie e cole todo o conteúdo do arquivo `SETUP_SUPABASE.sql`
5. Clique em **Run**

Isso criará:
- Tabela `users` com campos: `id`, `email`, `username`, `is_admin`
- Políticas de segurança RLS
- Trigger automático para sincronizar novos usuários

### 2. Promover o seu usuário a Admin (manualmente, na primeira vez)

Você precisará fazer isso uma vez manualmente via SQL:

```sql
-- Execute no SQL Editor do Supabase
UPDATE users SET is_admin = TRUE WHERE email = 'seu_email@example.com';
```

**OU** edite diretamente na tabela:
1. Vá para **Tabela Editor** no Supabase
2. Abra a tabela `users`
3. Clique no usuário
4. Altere o campo `is_admin` para `TRUE`
5. Salve

### 3. Usar o Painel de Admin

1. Faça login na aplicação com seu email
2. No cabeçalho, aparecerão dois novos botões:
   - **👤 Admin** - Painel de Administração
   - **📦 Manager** - Gerenciador de Produtos

### 4. Promover outros usuários a Admin

No **Painel de Administração** (`/admin`):
1. Digite o email do usuário que deseja promover
2. Clique em "Promover a Admin"
3. O usuário aparecerá com um badge "✓ Admin"
4. Quando fizer login novamente, terá acesso ao painel

## 📱 Funções disponíveis

### Para Admins:
- ✅ Acessar painel de administração (`/admin`)
- ✅ Promover outros usuários a admin
- ✅ Remover privilégios de admin
- ✅ Ver lista de todos os usuários
- ✅ Gerenciar produtos (`/manager`)

### Para Usuários normais:
- ✅ Navegar produtos
- ✅ Adicionar ao carrinho
- ✅ Fazer compras
- ✅ Visualizar perfil

## 🔐 Políticas de Segurança

- ✅ Apenas admins podem promover/remover admins
- ✅ Usuários só podem editar seus próprios dados
- ✅ RLS (Row Level Security) habilitado

## 🚀 Comandos úteis (SQL Editor do Supabase)

**Ver todos os usuários:**
```sql
SELECT id, email, username, is_admin, created_at FROM users;
```

**Promover um usuário:**
```sql
UPDATE users SET is_admin = TRUE WHERE email = 'user@example.com';
```

**Remover privilégio de admin:**
```sql
UPDATE users SET is_admin = FALSE WHERE email = 'user@example.com';
```

**Ver admins:**
```sql
SELECT email, is_admin FROM users WHERE is_admin = TRUE;
```

## ❌ Troubleshooting

**"Erro ao promover usuário"**
- ✓ Certifique-se de que a tabela `users` foi criada
- ✓ Verifique se você é admin no banco de dados
- ✓ Recarregue a página após fazer login

**"Não vejo os botões de admin"**
- ✓ Faça logout e login novamente
- ✓ Verifique no SQL Editor: `SELECT * FROM users WHERE email = 'seu_email';`
- ✓ Confirme que `is_admin` está como `true`

**RLS Policy error**
- ✓ Vá para **Authentication > Policies** no Supabase
- ✓ Certifique-se de que as policies foram criadas corretamente
- ✓ Se necessário, desabilite temporariamente RLS para debug

