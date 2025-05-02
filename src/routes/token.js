import { Router } from "express";

import tokenController from "../controller/tokenController";

const router = Router();

router.post("/", tokenController.store);

export default ro