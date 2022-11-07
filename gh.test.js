const jestConfig = require("./jest.config");

let page;

beforeEach(async () => {
  page = await browser.newPage();
})

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {

  beforeEach(async () => {
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

describe("Netology DevelopmentPage tests", () => {
    
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://netology.ru/development");
  }, 10000);

  test("The h1 header content'", async () => {
    await page.waitForSelector('h1.src-reallyShared-components-core-Heading--heading--PkavA.src-Landings-pages-Direction-components-Presentation--title--r7_mp');
    const title2 = await page.title();
    expect(title2).toEqual('Курсы программирования онлайн – обучение с нуля | Нетология');
  }, 6000);

  test("Open MiddleQA page", async () => {
    const link = await page.$eval('[data-program-id="29631"]', link => link.getAttribute('href') );
    await page.goto("https://netology.ru" + link);
    const actual = await page.title();
    expect(actual).toEqual("Тестировщик – обучение QA-инженеров на курсе в Нетологии");
  }, 6000);

  test("Switching to the course entry form MiddleQA", async () => {
    const link = await page.$eval('[data-program-id="29631"]', link => link.getAttribute('href') );
    await page.goto("https://netology.ru" + link);
    await page.click("[name='button']");
    const btnSelector = "[name='buttons.orderButton']";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toEqual("Записаться на курс");
  }, 6000);
});