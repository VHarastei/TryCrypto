module.exports = {
  reactStrictMode: true,
  env: {
    CLEARDB_DATABASE_URL: process.env.CLEARDB_DATABASE_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,
  },
  images: {
    domains: ['assets.coingecko.com'],
  },
};
