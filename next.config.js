module.exports = {
  reactStrictMode: true,
  env: {
    DB_HOST: '127.0.0.1',
    DB_USER: 'root',
    DB_PASS: 'password',
    DB_NAME: 'try-crypto',
    SECRET_KEY: process.env.SECRET_KEY,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,
  },
};
