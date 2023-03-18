import puppeteer from "puppeteer";

/**
 * @command sls invoke local -f RunAmazonScraper
 */
export async function main() {
  const params = {
    headless: false, // quando deployar trocar para true
    slowMo: 100, // quando deployar trocar para 0
    devtools: true,
    ignoreDefaultArgs: ["--disable-extensions"],
    args: ["--no-sandbox"],
  };

  console.log(params);

  const browser = await puppeteer.launch(params);

  const page = await browser.newPage();

  /* setando um tamanho fixo para a janela com o objetivo de 
  acessar sempre o mesmo layout*/

  await page.setViewport({ width: 1200, height: 2900 });

  await page.goto(
    "https://www.amazon.com.br/gp/bestsellers/?ref_=nav_cs_bestsellers",
    { waitUntil: "networkidle2" }
  );

  /*
    Ao usar o .evaluate, todo comando é executado no console do browser
  */
  const products = await page.evaluate(() => {
    const products = [];

    /*como a referência é (.a-carousel-card)
       foi necessário subir alguns nós, com o intuito de chegar ao elemento que traz a informação da categoria*/

    function getCategory(item: Element) {
      const category =
        item.parentNode?.parentNode?.parentNode?.parentNode?.parentNode
          ?.parentNode.childNodes[2]?.childNodes[0]?.childNodes[0];

      return category?.textContent;
    }

    function getPrice(x: Node, y: Node) {
      if (x?.textContent.includes("estrela")) return y?.textContent;
      else return x?.textContent;
    }

    function getStarsAndAvaliations(x: Node, y: Node) {
      if (x?.textContent.includes("estrela")) return x;
      else return y;
    }

    document
      .querySelectorAll(".a-carousel-card")
      // o retorno é NodeList, que não possui o método .map. Por isso usei forEach
      .forEach((item) => {
        const [rankingInc, rest] = Array.from(item.childNodes);
        const rest2 = rest.childNodes[0];
        const [image, productNameInc, maybeSAA, maybePrice] = Array.from(
          rest2.childNodes
        );

        const starsAndAvaliations = getStarsAndAvaliations(
          maybeSAA,
          maybePrice
        );

        const stars =
          starsAndAvaliations?.childNodes[0]?.childNodes[0]?.childNodes[0]
            ?.textContent;
        const avaliations =
          starsAndAvaliations?.childNodes[0]?.childNodes[0]?.childNodes[2]
            ?.textContent;

        const ranking = rankingInc?.textContent;
        const productName = productNameInc?.textContent;
        const price = getPrice(maybeSAA, maybePrice);
        const category = getCategory(item);

        console.log({
          ranking,
          stars,
          avaliations,
          productName,
          price,
          category,
        });

        products.push({
          ranking,
          stars,
          avaliations,
          productName,
          price,
          category,
          // falta o link
        });
      });

    return Promise.resolve(products);
  });

  console.log({ products });

  await browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify({
      products,
      message: "Aqui estão os mais vendidos da Amazon.",
    }),
  };
}
