if (process.env.NODE_ENV !== "production") {
  require("dotenv")
    .config();
}

export default {
  jwtSecret: process.env.JWT_SECRET,
  ports: {
    production: process.env.PORT,
    development: process.env.PORT,
    test: process.env.TEST_PORT
  },
  db: {
    production: {
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME
    },
    development: {
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME
    },
    test: {
      host: process.env.TEST_DB_HOST,
      username: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASS,
      port: process.env.TEST_DB_PORT,
      database: process.env.TEST_DB_NAME
    }
  },
  cloud: {
    endpoint: process.env.CLOUD_ENDPOINT,
    profiles: process.env.CLOUD_PROFILES,
    name: process.env.CLOUD_APP_NAME
  }
};
