const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
async function startLive(instance, browser) {
  setTimeout(async () => {
    console.log(`[${instance}]`, "Starting live ✨");
    const page = await browser.newPage().catch(e => console.error(e.message));
    const url = "https://www.youtube.com/watch?v=EMFGkUjHjd4";
    await page
      .goto(url, { waitUntil: "networkidle2", timeout: 60000 })
      .catch(e => console.error(e.message));
    console.log(`[${instance}]`, "Video loaded");
    //await page.waitFor(".ytp-button");
    await page.waitFor(2000).catch(e => console.error(e.message));
    console.log(`[${instance}]`, "Click on play button");
    page.keyboard.down("K").catch(e => console.error(e.message));
    console.log(`[${instance}]`, "Button clicked");
    await page.waitFor(90000).catch(e => console.error(e.message));
    console.log(`[${instance}]`, "Debug screenshot");
    await page
      .screenshot({
        path: `screenshots/live-${instance}.png`
      })
      .catch(e => console.error(e.message));
    //await page.waitFor(1000);
    console.log(`[${instance}]`, "Closing browser");
    await browser.close().catch(e => console.error(e.message));
  }, (instance - 1) * 300);
}

async function test() {
  puppeteer.launch({ headless: true }).then(async browser => {
    console.log("Running tests..");
    const page = await browser.newPage();
    await page.goto("https://bot.sannysoft.com");
    await page.waitFor(5000);
    await page.screenshot({ path: "testresult.png", fullPage: true });
    await browser.close();
    console.log(`All done, check the screenshot. ✨`);
  });
}

async function goLive(number) {
  const browserLive = await puppeteer
    .launch({
      headless: false,
      //defaultViewport: null
      args: ["--no-sandbox"]
    })
    .catch(e => console.error(e.message));
  for (var i = 1; i <= number; i++) {
    startLive(i, browserLive).catch(e => console.error(e.message));
  }
}

//test();
goLive(30);
