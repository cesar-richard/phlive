const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const number =5;
let c = 0;
async function startLive(browser, instance) {
  setTimeout(async () => {
    console.log(`[${instance}]`, "Starting live ✨");
    const page = await browser
      .newPage()
      .catch(e => console.error(`[${instance}]`, e.message));
    const url = "https://youtu.be/hjG_IGn5B_8";
    await page
      .goto(url, { waitUntil: "networkidle2", timeout: 60000 })
      .catch(e => console.error(`[${instance}]`, e.message));
    console.log(`[${instance}]`, "Video loaded");
    await page.waitFor(".ytp-button");
    //await page.waitFor(10000).catch(e => console.error(`[${instance}]`, e.message));
    console.log(`[${instance}]`, "Click on play button");
    await page
      .waitFor(3000)
      .catch(e => console.error(`[${instance}]`, e.message));
    // page.keyboard
    //   .down("K")
    //   .catch(e => console.error(`[${instance}]`, e.message));
    await page
      .waitFor(3000)
      .catch(e => console.error(`[${instance}]`, e.message));
    await page
      .screenshot({
        path: `screenshots/live-${instance}.png`
      })
      .catch(e => console.error(`[${instance}]`, e.message));
    await page
      .waitFor(130000)
      .catch(e => console.error(`[${instance}]`, e.message));
    
    c++;
    if(c==number){
      console.log(`[${instance}]`, "Closing browser");
      await browser.close().catch(e => console.error(`[${instance}]`, e.message));
    }else{
      console.log(`[${instance}]`, "Closing page");
      await page.close().catch(e => console.error(`[${instance}]`, e.message));
    }
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
      executablePath:
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      //defaultViewport: null,
      //args: ["--no-sandbox"]
    })
    .catch(e => console.error(`[${number}]`, e.message));
  for (var i = 1; i <= number; i++) {
    startLive(browserLive, i).catch(e =>
      console.error(`[${instance}]`, e.message)
    );
  }
}

test();
goLive(number);
