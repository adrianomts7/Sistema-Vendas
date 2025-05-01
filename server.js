import dotenv from "dotenv";

import sequelize from "./src/database/database.js";

dotenv.config();

async function connection() {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao MYSQL com sucesso");

    await sequelize.sync();
    console.log("Atualizando as tabelas com sucesso");
  } catch (e) {
    console.log("erro ao conectar a base de dados" + e);
  }
}

connection();
