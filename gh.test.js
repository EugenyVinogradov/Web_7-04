let page;


afterEach(() => {
  page.close();
});

describe("Github page tests", () => {

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 6000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 6000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 6000);
});

describe("Github loginPage tests", () => {
    
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/login");
  });

  test("The h1 header content'", async () => {
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('Sign in to GitHub · GitHub');
  }, 6000);

  test("The forgot password link attribute", async () => {
    const actual = await page.$eval("a.label-link", link => link.getAttribute('href') );
    expect(actual).toEqual("/password_reset");
  }, 6000);

  test("The page contains Sign in button", async () => {
    const btnSelector = "input.btn.btn-primary.btn-block.js-sign-in-button";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.getAttribute('data-signin-label'));
    expect(actual).toContain("Sign in")
  }, 6000);
});