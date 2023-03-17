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

  await page.setViewport({ width: 2199, height: 900 });

  await page.goto(
    "https://www.amazon.com.br/gp/bestsellers/?ref_=nav_cs_bestsellers",
    { waitUntil: "networkidle2" }
  );

  const z = await page.evaluate(() => {
    const a = [];
    document.querySelectorAll(".a-carousel-card").forEach((x) => {
      x.childNodes.forEach;
    });
    return Promise.resolve(a);
  });

  console.log({ z });

  await browser.close();
}
/*
{ranking
estrelas
avaliações
nome
preço
link}
*/

const getHref = (page, selector) =>
  page.evaluate(
    (selector) => document.querySelector(selector).getAttribute("href"),
    selector
  );
