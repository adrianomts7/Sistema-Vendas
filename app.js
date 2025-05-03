import dotenv from "dotenv";
import express from "express";

dotenv.config();

import produtos from "./src/routes/produto.js";
import token from "./src/routes/token.js";
import user from "./src/routes/user.js";

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
    this.app.use("/", user);
    this.app.use("/token", token);
    this.app.use("/produto", produtos);
  }
}

export default new App().app;
