import puppeteer from 'puppeteer';

describe('Popover tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
    await page.goto('http://localhost:8080');
  });

  test('Should show popover on button click', async () => {
    await page.goto('http://localhost:8080');

    const button = await page.$('.form-button');
    await button.click();

    await page.$('.popover.active');
    await page.waitForSelector('.popover.active');

    const popoverText = await page.$eval('.popover.active', (popover) => popover.textContent);
    expect(popoverText).toContain('Popover-title');
    expect(popoverText).toContain('And here\'s some amazing content. It\'s very engaging. Right?'); 10000
  });

  test('Should toggle popover visibility on multiple button clicks', async () => {
    await page.goto('http://localhost:8080');

    const button = await page.$('.form-button');
    await button.click();

    await page.$('.popover.active');
    await page.waitForSelector('.popover.active');

    await button.click();
    const isPopoverVisible = await page.$('.popover.active');
    expect(isPopoverVisible).toBeNull();
  });

  afterAll(async () => {
    await browser.close();
  });
});