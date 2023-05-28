# nestjs でステートレスなクロスサイトリクエストフォージェリ(XSRF)対策

## パッケージ

- npm install csrf
- npm i cookie-parser
- npm i -D @types/cookie-parser

## 起動

npm run start:dev

## 動作確認

- csrf トークン取得：ログイン時に呼ぶ

  http://localhost:3000/csrf-token  
  src\app.controller.ts

- 下記 middleware でトークン検証、トークン取得 API は除外する必要あり  
  src\middleware\csrf-protection.middleware.ts

## 参考

nestjs での cokkie の取得と設定  
https://qiita.com/mu-suke08/items/5266ca6213026f23a8e3

express で npm の csrf パッケージを検証  
https://qiita.com/kmatae/items/0ce25ac6bde0b301402a
