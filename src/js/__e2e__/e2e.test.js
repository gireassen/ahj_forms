const puppeteer = require('puppeteer'); // Подключаем библиотеку Puppeteer для автоматизации браузера

jest.setTimeout(30000);

// Описываем группу тестов для e2e тестирования popover'а
describe('Popover E2E Tests', () => {
  let browser;
  // let page;
  const baseUrl = 'http://localhost:9000';

  // Функция, которая выполняется перед всеми тестами
  beforeAll(async () => {
    // Запускаем браузер
    browser = await puppeteer.launch({
      headless: false, // Установите true, если не нужен видимый браузер (безголовый режим)
      slowMo: 50, // Замедляем выполнение на 50ms чтобы видеть взаимодействие
      // devtools: true,
    });
  });
  // Функция, которая выполняется после всех тестов
  afterAll(async () => {
    // Закрываем браузер
    await browser.close();
  });

  // Тестируем отображение и скрытие popover'а
  test('Show and remove popover', async () => {
    // Открываем новую страницу в браузере
    const page = await browser.newPage();

    // Переходим на локальный сервер (убедитесь, что сервер запущен на нужном порту)
    await page.goto(baseUrl);

    // Нажимаем на кнопку
    await page.click('.btn');

    // Ждем, пока появится popover
    await page.waitForSelector('.popover');

    // Извлекаем id, название и текст popover'а, указанные на кнопке
    const id = await page.$eval('.btn', el => el.getAttribute('aria-describedby'));
    const title = await page.$eval('.btn', el => el.dataset.title);
    const content = await page.$eval('.btn', el => el.dataset.content);

    // Извлекаем id, название и текст popover'а
    const popoverId = await page.$eval('.popover', el => el.id);
    const popoverTitle = await page.$eval('.popover__header', el => el.textContent);
    const popoverContent = await page.$eval('.popover__body', el => el.textContent);

    // Проверяем, что все соответствует ожидаемому
    expect(id).toBe(popoverId);
    expect(popoverTitle).toBe(title);
    expect(popoverContent).toBe(content);

    // Повторно нажимаем на кнопку
    await page.click('.btn');

    // Извлекаем наличие id popover'а на кнопке
    const hasId = await page.$eval('.btn', el => el.hasAttribute('aria-describedby'));

    // Проверяем, что id отсутствует
    expect(hasId).toBeFalsy();
  });
});
