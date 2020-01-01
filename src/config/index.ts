import actuator from "express-actuator";
import middlewares from "../middlewares";
import router from "../routes";

const { Cors } = middlewares;

export default (app: any) => {
  return (logger: any, { json, urlencoded }: any) => {
    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use(Cors("*"));
    app.use(logger("dev"));
    app.use(actuator());
    app.use("/api/v1", router);
  };
};
