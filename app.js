import dotenv from "dotenv";
import express from "express";

dotenv.config();

import produtos from "./src/routes/produto.js";
import token from "./src/routes/token.js";
import user from "./src/routes/user.js";
import vendas from "./src/routes/vendas.js";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/vendas", vendas);
    this.app.use("/token", token);
    this.app.use("/produto", produtos);
    this.app.use("/", user);
  }
}

export default new App().app;
