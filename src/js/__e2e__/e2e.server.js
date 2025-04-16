const webpack = require('webpack'); // Подключаем webpack для компиляции проекта
const WebpackDevServer = require('webpack-dev-server'); // Подключаем WebpackDevServer для создания и настройки дев-сервера
const config = require('../../../webpack.dev'); // Импортируем конфигурацию webpack для режима разработки

// Настройки для дев-сервера
const options = {
  compress: true, // Включаем сжатие для улучшения производительности
  historyApiFallback: true, // Перенаправляем все запросы к index.html для поддержки HTML5 History API
  hot: true, // Включаем горячую замену модулей (Hot Module Replacement)
  open: true, // Открываем браузер после запуска сервера
  port: 9000, // Указываем порт, на котором будет работать дев-сервер (должен совпадать с настройками в webpack.dev.js)
  static: './dist', // Путь к статическим файлам, которые будет обслуживать дев-сервер
};

// Создаем компилятор webpack с помощью конфигурации для режима разработки
const compiler = webpack(config);

// Создаем экземпляр WebpackDevServer с указанными настройками и компилятором
const server = new WebpackDevServer(options, compiler);

// Запускаем сервер и выводим сообщение в консоль после успешного старта
server.startCallback(() => {
  console.log(`dev server listening on port ${options.port}`);
});
