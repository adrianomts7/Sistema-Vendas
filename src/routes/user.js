import { Router } from "express";

import userController from "../controller/userController.js";
import gerenteRequired from "../middlewares/gerenteRequired.js";
import loginRequired from "../middlewares/loginRequired.js";

const router = Router();

// Listando todos os usuarios
router.get("/", loginRequired, userController.index);
// Listando somente um usuario atraves do id na url
router.get("/:id", loginRequired, gerenteRequired, userController.show);
// Criando Usuario (Vendedor / Gerente)
router.post("/", userController.store);
// Editando usuario atraves do id na url e os dados que irá atualizar no body
router.put("/:id", loginRequired, userController.update);
// Deletando usuario atraves do id
router.delete("/:id", loginRequired, gerenteRequired, userController.delete);

export default router;
