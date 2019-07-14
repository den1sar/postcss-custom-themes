const mainTest = require('../test/mainTest');
const readFile = require('./lib');

test('Dark theme', async () =>
  expect(
    await mainTest('./test/css/main.css',
      {
        themes: ['dark'],
        importFrom: './test/css/colors.css',
      })
  ).toBe(await readFile('./test/css/theme-dark.css'))
);
