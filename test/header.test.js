const Page = require("./helpers/page");

let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(() => {
  // page.close();
  const childProcess = page.process();
  if (childProcess) {
    childProcess.kill(9);
  }
});

test("Check header text is correct", async () => {
  page.waitFor("a.brand-logo");
  const text = await page.getContentsOf("a.brand-logo");
  expect(text).toEqual("Blogster");
});

test("click on oauth button", async () => {
  await page.click(".right a");
  const url = await page.url();

  expect(url).toMatch("/accounts.google.com/");
});

test("if logged in then show logout btn", async () => {
  await page.login();

  const text = await page.getContentsOf('a[href="/auth/logout"]');

  expect(text).toEqual("Logout");
});
