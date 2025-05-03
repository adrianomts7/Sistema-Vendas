import { Router } from "express";

import produtoController from "../controller/produtoController";
import gerenteRequired from "../middlewares/gerenteRequired";
import loginRequired from "../middlewares/loginRequired.js";

const router = Router();

router.use(loginRequired);

router.get("/", produtoController.index);
router.get("/:id", produtoController.show);
router.post("/", gerenteRequired, produtoController.store);
router.put("/:id", gerenteRequired, produtoController.update);
router.delete("/:id", gerenteRequired, produtoController.delete);

export default router;
