import express from "express";
import config from "./config";
import morgan from "morgan";
import env from "./env";
import db from "./db";
import { EurekaConfig, CloudConfig } from "./cloud";

const { ports, cloud } = env;
const { sequelize } = db;

const configure = (cb: any): void => {
  cb(morgan, express);
};

const loadCloudConfigAndEureka = async (): Promise<void> => {
  const c = await CloudConfig.loadConfig(cloud);
  const eureka = await EurekaConfig.loadEureka({
    instance: {
      app: c.get("eureka.instance.app"),
      hostName: c.get("eureka.instance.hostname"),
      ipAddr: c.get("eureka.instance.hostname"),
      statusPageUrl: c.get("eureka.instance.statusPage"),
      port: {
        "$": parseInt(ports[process.env.NODE_ENV]),
        "@enabled": true
      },
      vipAddress: c.get("eureka.instance.vipAddress"),
      dataCenterInfo: {
        "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
        name: "MyOwn"
      }
    },
    eureka: {
      serviceUrls: {
        default: [
          `http://${c.get("eureka.client.url")}/eureka/apps/`
        ]
      }
    }
  });
  eureka.start((err) => {
    if (err) throw err;
  });
};

const app = express();

configure(config(app));

app.listen(ports[process.env.NODE_ENV], async () => {
  console.log(`Server running on port ${process.env.PORT}`);
  if (process.env.NODE_ENV !== "test") {
    const s = await sequelize.sync({});
    if (s) console.log("Sequelize sync complete");
    await loadCloudConfigAndEureka();
  }
});

export default app;
