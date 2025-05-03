import { Router } from "express";

import produtoController from "../controller/produtoController.js";
import gerenteRequired from "../middlewares/gerenteRequired.js";
import loginRequired from "../middlewares/loginRequired.js";

const router = Router();

router.get("/", loginRequired, produtoController.index);
router.get("/:id", loginRequired, produtoController.show);
router.post("/", loginRequired, gerenteRequired, produtoController.store);
router.put("/:id", loginRequired, gerenteRequired, produtoController.update);
router.delete("/:id", loginRequired, gerenteRequired, produtoController.delete);

export default router;
