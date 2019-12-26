import { Router } from "express";
import { AuthController } from "../controllers";
import middlewares from "../middlewares";

const router = Router();
const controller = new AuthController();
const { AuthWares } = middlewares;

router.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    body: {
      message: "This is the event manager API",
      prefix: "/api/v1",
      routes: ["/auth", "/auth/login", "/auth/update", "/auth/logout"],
      allowedMethods: ["POST", "GET", "PATCH"]
    }
  });
});

router.post("/auth", AuthWares.checkKeys, AuthWares.checkEmailExists, controller.create);
router.post("/auth/login", controller.login);
router.get("/auth", AuthWares.checkToken, controller.get);
router.patch("/auth/update", AuthWares.checkToken, controller.update);
router.post("/auth/logout", AuthWares.checkToken, controller.logout);

export default router;
