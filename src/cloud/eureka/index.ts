import { Eureka } from "eureka-js-client";

export default class EurekaConfig {
  static async loadEureka(config: any): Promise<Eureka> {
    return new Eureka(config);
  }
}
