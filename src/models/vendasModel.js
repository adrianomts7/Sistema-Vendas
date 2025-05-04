import { DataTypes } from "sequelize";

import sequelize from "../database/database.js";
import Produtos from "../models/produtosModel.js";
import Users from "../models/userModel.js";

const VendasModel = sequelize.define("vendas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  produtoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: 1,
        msg: "Número minimo do id do produto é 1",
      },
    },
  },
  vendedorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: 1,
        msg: "Valor minimo para o id do vendedor é 1",
      },
    },
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: 1,
        msg: "Minimo de produtos para compra é 1",
      },
    },
  },
  valor: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      min: {
        args: 0.99,
        msg: "O valor minímo é R$ 0.99",
      },
    },
  },
  desconto: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
});

// Cada venda se refere a um produto e a um (Vendedor /  Gerente)
VendasModel.belongsTo(Produtos, { foreignKey: "produtoId" });
VendasModel.belongsTo(Users, { foreignKey: "vendedorId" });

// Produto Pode ter varias vendas e o (Vendedor / Gerente) pode fazer varias vendas
Produtos.hasMany(VendasModel, { foreignKey: "produtoId" });
Users.hasMany(VendasModel, { foreignKey: "vendedorId" });

export default VendasModel;
