import dotenv from "dotenv";

import app from "./app.js";
import sequelize from "./src/database/database.js";

dotenv.config();

async function connection() {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao MYSQL com sucesso");

    await sequelize.sync();
    console.log("Atualizando as tabelas com sucesso");

    app.listen(process.env.APP_PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.APP_PORT}`);
    });
  } catch (e) {
    console.log("erro ao conectar a base de dados" + e);
  }
}

connection();
