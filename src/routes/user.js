import { Router } from "express";

import userController from "../controller/userController.js";

const router = Router();

// Listando todos os usuarios
router.get("/", userController.index);
// Listando somente um usuario atraves do id na url
router.get("/:id", userController.show);
// Criando Usuario (Vendedor / Gerente)
router.post("/", userController.store);
// Editando usuario atraves do id na url e os dados que irá atualizar no body
router.put("/:id", userController.update);
// Deletando usuario atraves do id
router.delete("/:id", userController.delete);

export default router;
