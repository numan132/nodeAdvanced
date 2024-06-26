const puppeteer = require("puppeteer");

let browser, page;
beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
  await page.goto("http://localhost:3000");
});

afterEach(() => {
  browser.close();
});

test("Check header text is correct", async () => {
  const text = await page.$eval("a.brand-logo", (el) => el.innerHTML);
  expect(text).toEqual("Blogster");
});

test("click on oauth button", async () => {
  await page.click(".right a");
  const url = await page.url();

  expect(url).toMatch("/accounts.google.com/");
});

test("if logged in then show logout btn", () => {
  const id = "664dc1f36ba8433ca4536232";
  const Buffer = require("safe-buffer").Buffer;

  const sessionStorage = {
    passport: {
      user: id,
    },
  };

  Buffer.from(JSON.stringify(sessionStorage)).toString("base64");

  const Keygrip = require("keygrip");
  const key = require("../config/keys");
  const keygrip = new Keygrip([key.cookieKey]);

  const sig = keygrip.sign("session=" + sessionStorage);
  console.log(sessionStorage, sig);
});
