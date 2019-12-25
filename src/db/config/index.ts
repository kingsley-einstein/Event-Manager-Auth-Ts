import { DbConfig } from "./definition";
import env from "../../env";

const { db } = env;

const production: DbConfig = {
  host: db.production.host,
  username: db.production.username,
  password: db.production.password,
  port: parseInt(db.production.port),
  dialect: "pg",
  database: db.production.database,
  define: {
    underscored: true
  },
  sync: {
    force: false
  }
};

const development: DbConfig = {
  host: db.development.host,
  username: "",
  password: db.development.username,
  port: parseInt(db.development.port),
  dialect: "pg",
  database: db.development.database,
  define: {
    underscored: true
  },
  sync: {
    force: false
  }
};

const test: DbConfig = {
  host: db.test.host,
  username: db.test.username,
  password: db.test.password,
  port: parseInt(db.test.port),
  dialect: "pg",
  database: db.test.database,
  define: {
    underscored: true
  },
  sync: {
    force: true
  }
};

export default { production, development, test };
