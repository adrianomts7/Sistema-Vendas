import dotenv from "dotenv";
import express from "express";

dotenv.config();

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
  }
}

export default new App().app;
