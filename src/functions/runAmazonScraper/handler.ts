import puppeteer, { Browser } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

/**
 * @command sls invoke local -f RunAmazonScraper
 */
export async function main() {
  const params = {
    headless: chromium.headless,
    slowMo: 0,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    devtools: true,
    ignoreHTTPSErrors: true,
    ignoreDefaultArgs: ["--disable-extensions"],
    args: ["--disable-gpu", ...chromium.args],
    timeout: 5000,
  };

  console.log(params);

  let browser: Browser | undefined;
  try {
    browser = await puppeteer.launch(params);

    console.log("Browser iniciado");

    let [page] = await browser.pages();

    if (!page) {
      console.log("Nenhuma página disponível. Abrindo uma nova");

      page = await browser.newPage();
    }

    console.log("Nova página");

    /* setando um tamanho fixo para a janela com o objetivo de 
    acessar sempre o mesmo layout*/

    await page.setViewport({ width: 1200, height: 2900 });

    console.log("Tamanho setado");

    await page.goto(
      "https://www.amazon.com.br/gp/bestsellers/?ref_=nav_cs_bestsellers",
      { waitUntil: "networkidle2" }
    );

    console.log("Destino");

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

    return {
      statusCode: 200,
      body: JSON.stringify({
        products,
        message: "Aqui estão os mais vendidos da Amazon.",
      }),
    };
  } catch (error) {
    console.error("algo deu errado", error);
    return {
      headers: {},
      statusCode: 500,
      body: JSON.stringify({
        message: "Não foi possível encontrar os mais vendidos da Amazon",
      }),
    };
  } finally {
    await browser?.close();
  }
}
