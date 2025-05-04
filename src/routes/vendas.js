import { Router } from "express";

import vendasControllers from "../controller/vendasControllers";
import loginRequired from "../middlewares/loginRequired.js";

const router = Router();

router.get("/", loginRequired, vendasControllers.index);
router.get("/:id", loginRequired, vendasControllers.show);
router.post("/", loginRequired, vendasControllers.create);

export default router;
