import bcrypt from "bcrypt";

import User from "../models/userModel";

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({ where: { perfil: "vendedor" } });

      if (users.length === 0) {
        return res.status(400).json("Não tem nenhum vendedor cadastrado");
      }

      return res.json(users);
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json("Não foi possivel exibir todos os vendedores!");
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json("id é invalido");
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json("Usuario não encontrado");
      }

      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao procurar usuario");
    }
  }

  async store(req, res) {
    try {
      const { nome, email, password } = req.body;

      if (!nome && !email && !password) {
        return res.status(401).json("Os complete os campos!");
      }

      const user = await User.findOne({ where: email });

      if (user) {
        return res.status(400).json("Usuario já existe");
      }

      const newPassword = bcrypt.hashSync(password, 10);

      password = newPassword;

      const newUser = await User.create(nome, email, password);

      return res.json(newUser);
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao criar usuario");
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json("Id invalido");
      }

      const userExist = await User.findByPk(id);

      if (!userExist) {
        return res.status(401).json("Usuario não encontrado");
      }

      const { nome, email, password } = req.body;

      if (!nome || !email || !password) {
        return res.status(401).json("nome, email ou senha é invalido");
      }

      const hashPassword = bcrypt.hashSync(password, 10);

      const updatedUser = {
        nome: nome,
        email: email,
        password: hashPassword,
      };

      await User.update(updatedUser, { where: { id } });
      return res.json(updatedUser);
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao editar usuario");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json("Digite um id valido");
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(400).json("Usuario não encontrado");
      }

      await user.destroy();
      return res.json("Usuario deletado com sucesso!");
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao deletar usuario");
    }
  }
}

export default new UserController();
