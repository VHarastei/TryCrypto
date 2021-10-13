# TryCrypto

An application that simulates the work of a cryptocurrency exchange. You can try to work with cryptocurrency: buy, sell, watch the dynamics of prices, view your transaction history

![TC Preview](https://i.ibb.co/Xsg4CRM/try-crypto-herokuapp-com.png)

## Features

- SSR
- Data provided by CoinGecko API
- Responsive design
- Portfolio with daily PNL
- Transaction history
- Email verification

## Technologies

The application is written in TypeScript. The main feature is Server Side Rendering, which is made using React framework Next JS. The backend is made using the Route API provided by Next JS

Technologies used: 
- React, React-Hook-Form
- Redux-Toolkit
- Next JS, Route API, SWR, Next-Connect
- Sass, Css Modules
- Victory (for charts)
- Sequelize, Passport, JWT, Nodemailer

The application has a MySQL database with ORM Sequelize. Entity relationship diagram of database:

![TC DB](https://i.ibb.co/0X2yMsS/Try-Crypto-DB.png)

