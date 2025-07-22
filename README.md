## start
npm create vite@latest
  React, Typescript

## linter
npm i --save-dev eslint-plugin-boundaries eslint-import-resolver-typescript vite-tsconfig-paths
Обработка alias'ов через данные плагины, плюс настройка PublicAPI в файле eslint.boundaries.js, содержащая в себе ограчения по импортированию элементов из разных кусков архитектуры.


### swagger schema configuration & mocks
```bash
npm i -D openapi-typescript msw openapi-msw

npm i openapi-fetch openapi-react-query @tanstack/react-query 
```
openapi-typescript
Генерирует TypeScript-типы (интерфейсы, типы, enum и т.д.) из спецификации OpenAPI (обычно openapi.yaml или openapi.json).

msw (Mock Service Worker)
Назначение:
Библиотека для мокирования (подмены) HTTP-запросов на уровне браузера или Node.js.
Позволяет создавать фейковые ответы для API-запросов, не трогая реальный сервер.

openapi-react-query
Библиотека-надстройка, которая связывает openapi-fetch и @tanstack/react-query, чтобы автоматически генерировать React Query-хуки для вашего OpenAPI API.

Вызываем openapi-typescript для генерации типов, конечный файл generated.ts
```bash
npm run api
```
## Моки
Формируем моки командой
```bash
npx msw init public --save
```