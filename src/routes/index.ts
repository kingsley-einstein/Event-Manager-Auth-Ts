import { Router } from "express";
import { AuthController } from "../controllers";
import middlewares from "../middlewares";

const router = Router();
const controller = new AuthController();
const { AuthWares } = middlewares;

router.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    body: "This is the event manager API"
  });
});

router.post("/auth", AuthWares.checkKeys, controller.create);
router.get("/auth", AuthWares.checkToken, controller.get);
router.patch("/auth/update", AuthWares.checkToken, controller.update);
router.post("/auth/logout", AuthWares.checkToken, controller.logout);

export default router;
