const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
async function startLive(instance) {
  console.log(`[${instance}]`, "Starting live ✨");
  const browser = await puppeteer.launch({
    //headless: false
    //defaultViewport: null
  });

  const page = await browser.newPage();
  console.log(`[${instance}]`, "Browser opened");

  const url = "https://www.youtube.com/watch?v=aRXzW-o-zqs";

  console.log(`[${instance}]`, "Opening video");
  await page.goto(url, { waitUntil: "networkidle2" });

  await page.waitFor(".ytp-button");
  await page.waitFor(3000);
  console.log(`[${instance}]`, "Click on play button");
  page.keyboard.down("K");
  await page.waitFor(3000);
  console.log(`[${instance}]`, "Debug screenshot");
  await page.screenshot({
    path: `screenshots/live-${instance}.png`,
    fullPage: true
  });
  await page.waitFor(1000);
  console.log(`[${instance}]`, "Closing browser");
  await browser.close();
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
test();

for (var i = 1; i <= 20; i++) {
  startLive(i);
}
