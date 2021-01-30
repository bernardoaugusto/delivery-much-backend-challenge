# Backend Challenge

## Iniciar o Projeto

```shell
$ npm install
$ npm run build
$ docker-compose up
```

Criar as filas `incremented` para adição e `decremented` para a subtração e realizar o Binding com as exchanges no RabbitMQ Management.

Popular o banco de dados:

```shell
$ npm run seed
```

Iniciar a aplicação:

```shell
$ npm run start
```

### RabbitMQ

As mensagens de alteração de estoque de produto enviadas pelo serviço de estoque são disparadas na exchange `stock`, com a routing key `incremented` para adição e `decremented` para a subtração. O tipo da exchange é `direct`. O body da mensagem possui o nome do produto em questão como conteúdo, ex. `Lettuce`.

O serviço de estoque e o RabbitMQ estão disponíveis no [docker-compose.yml](docker-compose.yml) e serão executados pelo comando abaixo:


O serviço do RabbitMQ estará disponível na porta: `5672` e a UI do RabbitMQ Management estará na porta: `15672` (`http://localhost:15672/`) com user: `guest` e password: `guest`.

  > Caso já exista uma instância do RabbitMQ rodando na sua máquina é preciso interrompê-la e utilizar a que é disponibilizada ao executar o docker-compose.

Aguarde os containers terminarem de iniciar. Se der tudo certo, você verá o log de quais alimentos entraram no estoque:

```shell
stock-service_1  | Message sent to incremented:
stock-service_1  |     Tea
stock-service_1  | Message sent to decremented:
stock-service_1  |     Coffee
```

### API


1. Busca um produto pelo nome:

```
[GET] products/:name
```

Response exemplo:

```json
{
  "name": "Brazil nut",
  "price": 5.16,
  "quantity": 5
}
```

2. Registra um pedido:

```
[POST] orders
```

Body exemplo:

```json
{
  "products": [
    {
      "name": "Kiwi",
      "quantity": 1
    }
  ]
}
```

Response exemplo:

```json
{
  "id": "42",
  "products": [
    {
      "name": "Kiwi",
      "quantity": 1,
      "price": 9.21
    }
  ],
  "total": 9.21
}
```


3. Busca todos os pedidos aprovados:

```
[GET] orders
```

Response exemplo:

```json
{
  "orders": [
      {
        "id": "123",
        "products": [
          {
            "name": "Watermelon",
            "quantity": 2,
            "price": 5.47
          }
         ],
        "total": 10.94
     }
  ]
}
```

4. Busca um pedido pelo `id`:

```
[GET] orders/:id
```

Response exemplo:

```json
{
  "id": "456",
  "products": [
    {
      "name": "Coffee",
      "quantity": 3,
      "price": 2.43
    }
  ],
  "total": 7.29
}
```
