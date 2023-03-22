# api-scraper

antes de rodar o script deploy-layer.sh instalar make e zip

<h1 align="center">API Scraper</h1>
<h3 align="center">Aplicação desenvolvida para o processo seletivo de estágio da empresa BGC Brasil</h3>

&nbsp;&nbsp;

## 🔍 Sobre

A aplicação é uma API que possibilita tomada de dados dos mais vendidos do site da Amazon

&nbsp;

## ⚒ Tecnologias e ferramenteas

Tecnologias e ferramentas utilizadas na aplicação:

- [NodeJS](https://pt-br.reactjs.org)
- [Serverless Framework](https://serverless.com/)
- [Type Script](https://www.typescriptlang.org/)
- [AWS Lambda](https://aws.amazon.com/pt/lambda/)
- [AWS API Gateway](https://aws.amazon.com/pt/api-gateway/)
- [AWS DynamoDB](https://aws.amazon.com/pt/dynamodb/)
- [AWS Layers](https://docs.aws.amazon.com/lambda/latest/dg/invocation-layers.html)
- [Puppeteer](https://pptr.dev/)
- [Chromium](https://github.com/Sparticuz/chromium)

&nbsp;

## 🚀 Fazendo Deploy da aplicação

Você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com)
- [NodeJS](https://nodejs.org/en/)
- [Make](https://howtoinstall.co/pt/make)
- [Zip](https://www.tecmint.com/install-zip-and-unzip-in-linux/)

Além disso, será necessário configurar as credenciais de acesso da AWS.

```bash
# Clone este repositório
$ git clone "https://github.com/lucaschristensemlima/api-scraper"

# Acesse a pasta do projeto no terminal/cmd
$ cd api-scraper

# Instale as dependências
$ npm install

# Permita execução
$ chmod +x deploy-layer.sh

# Execute o script que baixa o Chromium para criação do layer
$ sudo ./deploy-layer.sh

# Faça o deploy
$ sls deploy
```

&nbsp;

## 🚀 Invocando localmente

Para invocar localmente, também é necessário configurar as credenciais de acesso da AWS

Para obter os mais vendidos da amazon é necessário utilizar o seguinte comando:

```bash
sls invoke local -f RunAmazonScraper
```

Já para obter uma busca previamente efetuada altere o arquivo `src/functions/getSearch/mock.json` para:

```json
{
  "pathParameters": {
    "searchId": "e230f4c9-8c03-4b83-8c7b-162206797fc7" // coloque o ID da busca desejada aqui
  }
}
```

Depois, basta executar o seguinte comando:

```bash
sls invoke local -f GetSearch --path src/functions/getSearch/mock.json
```

&nbsp;

## 🚀 Invocando via HTTP

Nesse exemplo usaremos o Insomnia, mas você poderá utilizar o seu API Client de preferência.

```
POST - https://liwso70f31.execute-api.us-east-1.amazonaws.com/dev/amazon/mais-vendidos
GET - https://liwso70f31.execute-api.us-east-1.amazonaws.com/dev/amazon/mais-vendidos/{searchId}
```

### `RunAmazonScraper`

Chame, com o método POST a url `https://liwso70f31.execute-api.us-east-1.amazonaws.com/dev/amazon/mais-vendidos` e espere uma resposta similar a:

```json
{
	"search": {
		"id": "8d82ad70-30f6-42bd-a45d-77d5c7224109",
		"createdAt": "2023-03-22T14:11:32.793Z",
		"productsByCategory": {
			"Mais Vendidos em Cozinha": [
				{
					"ranking": "#1",
					"stars": "4,8 de 5 estrelas",
					"avaliations": "5.045",
					"productName": "Tábua Retangular Bamboo Mor 30cm x 20cm",
					"price": "R$ 22,11",
					"category": "Mais Vendidos em Cozinha",
					"link": "https://www.amazon.com.br/T%C3%A1bua-Retangular-Bamboo-Mor-30cm/dp/B0778TXP77/ref=zg-bs_kitchen_sccl_1/143-7557287-1254169?pd_rd_w=YhQMg&content-id=amzn1.sym.b84c4b85-d0b6-44ab-b250-acbd7d0f923e&pf_rd_p=b84c4b85-d0b6-44ab-b250-acbd7d0f923e&pf_rd_r=WMYAGM2ZWYM0YCJBN3M9&pd_rd_wg=OfzGs&pd_rd_r=61d8b6c3-4c95-4df0-bb2e-2aafb43b2af0&pd_rd_i=B0778TXP77&psc=1"
				},
				...
			],
			"Mais Vendidos em Eletrônicos": [...],
            ...
		}
	},
	"message": "Aqui estão os mais vendidos da Amazon."
}
```

### `GetSearch`

Chame, com o método GET a url `https://liwso70f31.execute-api.us-east-1.amazonaws.com/dev/amazon/mais-vendidos/{searchId}` trocando `{searchId}` pelo seu Id e espere uma resposta similar a:

```json
{
	"search": {
		"id": "8d82ad70-30f6-42bd-a45d-77d5c7224109",
		"createdAt": "2023-03-22T14:11:32.793Z",
		"productsByCategory": {
			"Mais Vendidos em Cozinha": [
				{
					"ranking": "#1",
					"stars": "4,8 de 5 estrelas",
					"avaliations": "5.045",
					"productName": "Tábua Retangular Bamboo Mor 30cm x 20cm",
					"price": "R$ 22,11",
					"category": "Mais Vendidos em Cozinha",
					"link": "https://www.amazon.com.br/T%C3%A1bua-Retangular-Bamboo-Mor-30cm/dp/B0778TXP77/ref=zg-bs_kitchen_sccl_1/143-7557287-1254169?pd_rd_w=YhQMg&content-id=amzn1.sym.b84c4b85-d0b6-44ab-b250-acbd7d0f923e&pf_rd_p=b84c4b85-d0b6-44ab-b250-acbd7d0f923e&pf_rd_r=WMYAGM2ZWYM0YCJBN3M9&pd_rd_wg=OfzGs&pd_rd_r=61d8b6c3-4c95-4df0-bb2e-2aafb43b2af0&pd_rd_i=B0778TXP77&psc=1"
				},
				...
			],
			"Mais Vendidos em Eletrônicos": [...],
            ...
		}
	},
	"message": "Aqui estão os mais vendidos da Amazon."
}
```

&nbsp;

## 👩‍💻 Autor

Feito por[Lucas Christensem Lima](https://www.linkedin.com/in/lucaschristensem/).
