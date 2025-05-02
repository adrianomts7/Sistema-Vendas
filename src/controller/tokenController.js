import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(401).json("Faça login");
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json("Usuario não encontrado");
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json("Senha invalida");
      }

      const { id } = user;

      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRED,
      });

      return res.json(token);
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao criar o token");
    }
  }
}

export default new TokenController();
