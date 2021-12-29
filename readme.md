# Hanaの私帳

此專案使用了Node.js 及 Express架構，可提供使用者紀錄生活的開銷。

## User Story

Hana 可以：

1. 註冊帳號
   1. 註冊之後，可以登入/登出
   2. 只有登入狀態的使用者可以看到 app 內容，否則一律被導向登入頁
2. 在首頁一次瀏覽所有支出的清單
   1. 使用者只能看到自己建立的資料
3. 在首頁看到所有支出清單的總金額
4. 新增一筆支出 (資料屬性參見下方規格說明)
5. 編輯支出的屬性 (一次只能編輯一筆)
6. 刪除任何一筆支出 (一次只能刪除一筆)
7. 根據「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和


## 功能列表
1. 註冊並使用帳號
2. 新增、修改及刪除支出紀錄
3. 可依類別篩選並得知加總金額
4. 可依關鍵字收尋紀錄名稱


### 安裝資料庫

請先確認安裝有安裝mongoDB(4.2.17)

1.至官網下載4.2.17版本https://www.mongodb.com/download-center/community

2.將資料夾移動至/Users/[你的使用者名稱]/改名為"mongodb"，並於同階層新增"mongodb-data"資料夾

3.執行mongoDB
```
cd ~/mongodb/bin/       // 切換到 mongodb 目錄
```
```
./mongod --dbpath /Users/[你的使用者名稱]/mongodb-data
```
若能於系統訊息中查詢到"waiting for connections on port 27017"，即表示資料庫成功連接。


### 安裝

1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

```
git clone https://github.com/RonnyChiang/expense-tracker.git
```

2.初始

```
cd expense-tracker //切至專案資料夾
```

```
npm install  //安裝套件
```

```
npm install nodemon -g              // -g 安裝在全域
```

```
npm run seed             // 安裝預設使用者及種子資料（如有需要）
```
預設使用者帳號為 user1@example.com及user2@example.com，密碼皆為12345678


3.開啟程式

```
npm run start
```
當終端機(terminal)出現以下文字，代表伺服器已啟動
```
Express is running on http://localhost:3000
```
若要暫停使用
```
ctrl + c
```

環境變數請參閱 env.example

# 專案開發人員
[Ronny Chiang](https://github.com/RonnyChiang)

## Screen Photo

<img width="1399" alt="截圖 2021-12-29 下午2 22 46" src="https://user-images.githubusercontent.com/43169057/147633137-e9e7a0d2-a085-4597-acd3-89e106cfc070.png">


## 版本更新 

2021.12.29 - 第一版上線


## 使用工具


- MacbookAir M1 - 開發環境
- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
- [node.js 16.13.1](https://nodejs.org/en/) - 開發環境

其他請參閱package.json

