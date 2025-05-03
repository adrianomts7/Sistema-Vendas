import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("faça login");
  }

  const [, token] = authorization.split(" ");

  if (!token) {
    return res.status(400).json("Token invalido");
  }

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id } = dados;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json("Usuario não encontrado");
    }

    req.user = user;

    return next();
  } catch (e) {
    console.log(e);
    return res.status(401).json("Token invalido");
  }
};
