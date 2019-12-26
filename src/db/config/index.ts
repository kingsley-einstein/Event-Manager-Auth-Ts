import { DbConfig } from "./definition";
import env from "../../env";

const { db } = env;

const production: DbConfig = {
  host: db.production.host,
  username: db.production.username,
  password: db.production.password,
  port: parseInt(db.production.port),
  dialect: "postgres",
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
  username: db.development.username,
  password: db.development.password,
  port: parseInt(db.development.port),
  dialect: "postgres",
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
  dialect: "postgres",
  database: db.test.database,
  define: {
    underscored: true
  },
  sync: {
    force: true
  }
};

export default { production, development, test };
