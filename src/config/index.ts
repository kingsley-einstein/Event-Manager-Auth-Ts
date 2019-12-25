import middlewares from "../middlewares";

const { Cors } = middlewares;

export default (app: any) => {
  return (logger: any, { json, urlencoded }: any) => {
    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use(Cors("*"));
    app.use(logger("dev"));
  };
};
