import { DataTypes } from "sequelize";

import sequelize from "../database/database";

const userModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 15],
        msg: "O nome deve ter de 3 a 15 caracteres",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "O email é obrigatorio",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perfil: {
    type: DataTypes.ENUM("gerente", "vendedor"),
    allowNull: false,
    defaultValue: "vendedor",
  },
  criadoEm: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default userModel;
