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
GET - https://liwso70f31.execute-api.us-east-1.amazonaws.com/dev/amazon/mais-vendidos
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
	"message": "Busca retornada com sucesso!"
}
```

### `ListSearch`

Chame, com o método GET a url `https://liwso70f31.execute-api.us-east-1.amazonaws.com/dev/amazon/mais-vendidos` e espere uma resposta similar a:

```json
{
	"searches": [
		{
			"createdAt": "Wed Mar 22 2023 09:14:38 GMT-0300 (Brasilia Standard Time)",
			"id": "fbf9ceac-2fe6-4258-b3b9-5d7b07988e9e",
			"productsByCategory": {
				"Mais Vendidos em Esporte": [
					{
						"avaliations": "4.754",
						"price": "R$ 53,10",
						"link": "https://www.amazon.com.br/Caixa-T%C3%A9rmica-18L-Mor-Azul/dp/B078P2V57D/ref=zg-bs_sports_sccl_1/143-0188063-7975900?pd_rd_w=u5OpK&content-id=amzn1.sym.b84c4b85-d0b6-44ab-b250-acbd7d0f923e&pf_rd_p=b84c4b85-d0b6-44ab-b250-acbd7d0f923e&pf_rd_r=CP5TQN4X8JC24TKS2SV9&pd_rd_wg=j4MxG&pd_rd_r=99c22cfd-4ff4-404d-b7b5-ddb41478576e&pd_rd_i=B078P2V57D&psc=1",
						"ranking": "#1",
						"stars": "4,7 de 5 estrelas",
						"category": "Mais Vendidos em Esporte",
						"productName": "Caixa Térmica 18 Litros Mor Azul"
					},
                    ...
                ],
                "Mais Vendidos em Eletrônicos": [...],
                ...
            }
            {
                "createdAt": "2023-03-22T14:11:32.793Z",
			    "id": "8d82ad70-30f6-42bd-a45d-77d5c7224109",
			    "productsByCategory": {...},
            ...
            }
        }
    ], "message": "Buscas retornadas com sucesso!"
}
```

&nbsp;

## 👩‍💻 Autor

Feito por [Lucas Christensem Lima](https://www.linkedin.com/in/lucaschristensem/).
