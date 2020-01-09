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

    //Provide health check endpoint for Kintohub
    app.get("/", (req: any, res: any) => {
      res.status(200).json({
        status: "UP"
      });
    });

    // API routes
    app.use("/api/v1", router);
  };
};
