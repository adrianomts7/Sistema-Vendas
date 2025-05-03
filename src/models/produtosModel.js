import { DataTypes } from "sequelize";

import sequelize from "../database/database.js";

const ProdutosModel = sequelize.define("produtos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 20],
        msg: "O nome do produto deve ter de 2 a 20 produtos",
      },
    },
  },
  categoria: {
    type: DataTypes.ENUM(
      "eletrônicos",
      "roupas",
      "alimentos",
      "limpeza",
      "higiene",
    ),
    allowNull: false,
  },
  preco: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
      min: {
        args: 0.99,
        msg: "O valor minimo é 0.99",
      },
    },
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: 1,
        msg: "Quantidade minima do produto é 1",
      },
    },
  },
});

export default ProdutosModel;
