# 🧪 Guia de Teste do Fluxo de Pagamento do Stripe

## 📋 Pré-requisitos

1. **Conta Stripe Sandbox**: Crie uma conta em [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. **Chaves Stripe**: Copie as chaves de teste:
   - `STRIPE_PUBLISHABLE_KEY=pk_test_...`
   - `STRIPE_SECRET_KEY=sk_test_...`
   - `STRIPE_WEBHOOK_SECRET=whsec_...`

## 🔧 Configuração Inicial

### 1. Configure as variáveis de ambiente

```bash
# Crie ou edite o arquivo .env na pasta src/
cd src
cp .env.example .env
```

Adicione as chaves do Stripe ao seu arquivo `.env`:

```env
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
BASE_URL=http://localhost:3000
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor

```bash
npm run dev
```

## 🧪 Fluxo de Teste Completo

### Passo 1: Criar um Usuário Teste

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "repeat_password": "password123"
  }'
```

### Passo 2: Fazer Login para obter Token

```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "test@example.com",
    "password": "password123"
  }'
```

**Resposta esperada:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com"
    }
  }
}
```

### Passo 3: Adicionar Jogos ao Carrinho

Primeiro, liste os jogos disponíveis:

```bash
curl http://localhost:3000/api/games
```

Adicione jogos ao carrinho:

```bash
curl -X POST http://localhost:3000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "game_edition_id": 1,
    "quantity": 1
  }'
```

### Passo 4: Finalizar Pedido

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta esperada:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "PENDING",
    "expire_date": "2024-01-15T15:30:00.000Z",
    "total": "59.90",
    "items": [...]
  }
}
```

### Passo 5: Criar Sessão de Checkout

```bash
curl -X POST http://localhost:3000/api/payment/create-checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "order_id": 1
  }'
```

**Resposta esperada:**

```json
{
  "success": true,
  "data": {
    "sessionId": "cs_test_...",
    "url": "https://checkout.stripe.com/pay/..."
  }
}
```

### Passo 6: Simular Pagamento no Stripe

1. Copie a URL da resposta anterior
2. Acesse a URL no navegador
3. Use os dados de teste do Stripe:
   - Número do cartão: `4242 4242 4242 4242`
   - Data: Qualquer data futura
   - CVV: `123`
   - CEP: `12345678`

### Passo 7: Testar Webhook (Manual)

Para testar o webhook manualmente, você pode usar o Stripe CLI:

1. Instale o Stripe CLI:

```bash
npm install -g @stripe/stripe-cli
```

2. Faça login:

```bash
stripe login
```

3. Inicie o local webhook:

```bash
stripe listen --forward-to localhost:3000/api/payment/webhook
```

4. Dispare o evento manualmente:

```bash
stripe trigger checkout.session.completed
```

## 🧪 Testes Unitários

### Testar Controller

```javascript
// Teste do controller de pagamento
const request = require("supertest");
const app = require("../app");

describe("Payment Controller", () => {
  test("should create checkout session", async () => {
    const response = await request(app)
      .post("/api/payment/create-checkout")
      .set("Authorization", "Bearer SEU_TOKEN")
      .send({ order_id: 1 });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.sessionId).toBeDefined();
  });
});
```

### Testar Service

```javascript
// Teste do service de pagamento
const { createCheckoutSessionService } = require("../services/payment.service");

describe("Payment Service", () => {
  test("should create Stripe checkout session", async () => {
    const result = await createCheckoutSessionService(1, 1);
    expect(result.sessionId).toBeDefined();
    expect(result.url).toContain("stripe.com");
  });
});
```

## 🐛 Debug e Solução de Problemas

### 1. Verificar Logs do Servidor

```bash
# Inicie o servidor em modo de debug
npm run dev
```

### 2. Testar Webhook Local

Use o Stripe CLI para testar webhooks localmente:

```bash
stripe listen --forward-to localhost:3000/api/payment/webhook
```

### 3. Verificar Assinatura do Webhook

Se o webhook falhar, verifique:

- A variável `STRIPE_WEBHOOK_SECRET` está correta
- O header `stripe-signature` está presente
- O corpo da requisição não está corrompido

### 4. Problemas de Conexão com Banco

Verifique as configurações do banco em `src/configs/db/`

## 📊 Testes de Carga

### Simular Múltiplos Pagamentos

```bash
# Usando curl para simular múltiplas requisições
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/payment/create-checkout \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer SEU_TOKEN" \
    -d '{"order_id": 1}' &
done
```

## 🔒 Testes de Segurança

### 1. Testar Token Inválido

```bash
curl -X POST http://localhost:3000/api/payment/create-checkout \
  -H "Authorization: Bearer token_invalido" \
  -d '{"order_id": 1}'
```

**Resposta esperada:** 401 Unauthorized

### 2. Testar Dados Inválidos

```bash
curl -X POST http://localhost:3000/api/payment/create-checkout \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"order_id": "invalido"}'
```

**Resposta esperada:** 400 Bad Request

## 🎯 Próximos Passos

1. **Testar em Ambiente de Produção**: Substitua as chaves de teste por chaves de produção
2. **Configurar Webhook Real**: Configure o webhook no dashboard do Stripe
3. **Adicionar Webhook Events**: Implemente outros eventos como `payment_intent.succeeded`
4. **Implementar Webhooks Retentativos**: Configure retries para falhas de webhook

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do servidor
2. Confirme as chaves do Stripe
3. Teste com o Stripe CLI
4. Verifique a conexão com o banco de dados

---

**Nota:** Este guia assume que você já tem dados de jogos e edições no banco de dados. Se não tiver, use os seeds disponíveis ou adicione dados manualmente.
