import Client, { Config } from "cloud-config-client";

export default class CloudConfig {
  static async loadConfig(config: any): Promise<Config | Error | any> {
    return Client.load(config);    
  }
}
