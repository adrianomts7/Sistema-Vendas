import { Router } from "express";

import tokenController from "../controller/tokenController.js";

const router = Router();

router.post("/", tokenController.store);

export default router;
