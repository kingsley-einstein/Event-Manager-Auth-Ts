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
      instanceId: `${c.get("eureka.instance.app")}:${ports[process.env.NODE_ENV]}`,
      hostName: c.get("eureka.instance.hostname"),
      ipAddr: c.get("eureka.instance.hostname"),
      statusPageUrl: c.get("eureka.instance.statusPage"),
      healthCheckUrl: c.get("eureka.instance.healthCheck"),
      homePageUrl: `${c.get("eureka.instance.hostname")}:${ports[process.env.NODE_ENV]}/`,
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
      preferIpAddress: true,
      serviceUrls: {
        default: [
          `${c.get("eureka.client.url")}/eureka/apps/`
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
  console.log(`Server running on port ${ports[process.env.NODE_ENV]}`);
  if (process.env.NODE_ENV !== "test") {
    const s = await sequelize.sync({});
    if (s) console.log("Sequelize sync complete");
    await loadCloudConfigAndEureka();
  }
});

export default app;
