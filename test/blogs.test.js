const Page = require("./helpers/page");

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  // await page.close()
  const childProcess = page.process();
  if (childProcess) {
    childProcess.kill(9);
  }
});

describe("when logged in", async () => {
  beforeEach(async () => {
    await page.login();
    await page.click("a.btn-floating");
  });
  test("after login goto blog form", async () => {
    const label = await page.getContentsOf("form label");

    expect(label).toEqual("Blog Title");
  });

  describe('and using invalid input', async () => {
    beforeEach(async () => {
        await page.click('form button')
    })
    test("form shows an error message", async () => {
        const titleError = await page.getContentsOf('.title .red-text');
        const contentError = await page.getContentsOf('.content .red-text')

        expect(titleError).toEqual('You must provide a value')
        expect(contentError).toEqual('You must provide a value')
    })
  })
  describe('and using valid input', async () => {
    beforeEach(async () => {
        await page.type('.title input', "my Title")
        await page.type('.content input', "my Content")
        await page.click('form button')
    })
    test('submittion take user to review screen', async () => {
        const text = await page.getContentsOf('h5')
        expect(text).toEqual('Please confirm your entries')
    })
    test('submitting and saving added blog to index page', async () => {
        await page.click('button.green')
        await page.waitFor('.card')

        const title = await page.getContentsOf('.card-title');
        const content = await page.getContentsOf('p')

        expect(title).toEqual('my Title')
        expect(content).toEqual('my Content')
    })
  })
});
