import bcrypt from "bcrypt";
import validator from "validator";

import User from "../models/userModel.js";

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

      const { nome, email } = user;
      return res.json({ msg: `Nome: ${nome}, email: ${email}` });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao procurar usuario");
    }
  }

  async store(req, res) {
    try {
      const { nome, email, password, perfil } = req.body;
      const perfis = ["gerente", "vendedor"];

      if (!nome && !email && !password && !perfil) {
        return res.status(401).json("Os complete os campos!");
      }

      const user = await User.findOne({ where: { email } });

      if (user) {
        return res.status(400).json("Usuario já existe");
      }

      if (typeof nome !== "string" || nome.trim().length < 3) {
        return res.status(400).json("Nome invalido");
      }

      if (typeof password !== "string" || password.trim().length < 7) {
        return res.status(400).json("A senha deve ter no minimo 7 caracteres");
      }

      if (validator.isEmail(email)) {
        return res.status(400).json("E-mail invalido");
      }

      if (!perfis.includes(perfil)) {
        return res.status(400).json("Perfil invalido");
      }

      const newPassword = bcrypt.hashSync(password, 10);

      const newUser = { nome, email, newPassword, perfil };

      await User.create(newUser);

      return res.json({ msg: `${nome} foi criado com sucesso` });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao criar usuario");
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedUser = {};

      if (!id) {
        return res.status(401).json("Id invalido");
      }

      const userExist = await User.findByPk(id);

      if (!userExist) {
        return res.status(401).json("Usuario não encontrado");
      }

      const { nome, email, password, perfil } = req.body;

      if (!nome && !email && !password && !perfil) {
        return res
          .status(401)
          .json("Os dados enviado para atualizar s6ão invalidos");
      }

      let hashPassword = null;

      if (nome) {
        if (typeof nome !== "string" || nome.trim().length < 3) {
          return res.status(400).json("Nome invalido");
        } else {
          updatedUser.nome = nome;
        }
      }

      if (email) {
        if (!validator.isEmail(email)) {
          return res.status(401).json("Digite um email valido");
        } else {
          updatedUser.email = email;
        }
      }

      if (password) {
        if (typeof password !== "string" || password.trim().length < 7) {
          return res
            .status(400)
            .json("A senha deve ter no minimo 7 caracteres");
        } else {
          hashPassword = bcrypt.hashSync(password, 10);
          updatedUser.password = hashPassword;
        }
      }

      if (perfil) {
        const perfis = ["gerente", "vendedor"];
        if (perfis.includes(perfil)) {
          return res.status(400).json("Perfil invalido");
        } else {
          updatedUser.perfil = perfil;
        }
      }

      await User.update(updatedUser, { where: { id } });
      return res.json({
        msg: `O usuario do id ${id} foi atualizado com sucesso`,
      });
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

      const { nome } = user;

      await user.destroy();
      return res.json({
        msg: `${nome} foi deletado com sucesso, com o id ${id}`,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao deletar usuario");
    }
  }
}

export default new UserController();
