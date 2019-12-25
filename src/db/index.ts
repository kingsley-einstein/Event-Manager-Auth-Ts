import { Sequelize, DataTypes } from "sequelize";
import config from "./config";
import models from "./model";

const sequelize = new Sequelize(
  config[process.env.NODE_ENV]
);

const db: any = { sequelize };

Object.keys(models).forEach((key) => {
  db[key] = models[key](sequelize, DataTypes);
});

export default db;
