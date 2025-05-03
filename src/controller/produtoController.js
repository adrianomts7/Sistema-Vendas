import Produto from "../models/produtosModel.js";

class ProdutoController {
  async index(req, res) {
    try {
      const categorias = [
        "eletrônicos",
        "roupas",
        "alimentos",
        "limpeza",
        "higiene",
      ];

      const { categoria } = req.body;

      if (!categoria) {
        return res.status(400).json("Categoria invalida");
      }

      if (!categorias.includes(categoria)) {
        return res.status(400).json("Categoria invalida");
      }

      const productos = await Produto.findAll({ where: { categoria } });

      if (productos.length === 0) {
        return res.status(401).json("Não tem nenhum produto cadastrado");
      }

      return res.json(productos);
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json("Não foi possivel buscar todos os produtos cadastrados");
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json("Digite o id do produto válido");
      }

      const producto = await Produto.findByPk(id);

      if (!producto) {
        return res.status(400).json("Produto não encontrado");
      }

      const { nome, quantidade, preco } = producto;

      return res.json({
        mensagem: `${nome} está custando R$ ${preco}`,
        estoque: `Quantida no estoque: ${quantidade}`,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao buscar produto");
    }
  }

  async store(req, res) {
    try {
      const { nome, preco, quantidade, categoria } = req.body;
      const categorias = [
        "eletrônicos",
        "roupas",
        "alimentos",
        "limpeza",
        "higiene",
      ];

      if (!nome || !preco || !quantidade || !categoria) {
        return res
          .status(401)
          .json("Digite dados válidos para cadastrar um novo produto");
      }

      if (typeof nome !== "string" || nome.trim().length < 2) {
        return res.status(400).json("Digite um nome válido");
      }

      if (isNaN(preco) || preco <= 0) {
        return res.status(400).json("Digite um preço válido");
      }

      if (isNaN(quantidade) || quantidade <= 0) {
        return res.status(400).json("Quantidade invalida");
      }

      if (!categorias.includes(categoria)) {
        return res.status(400).json("Categoria invalida");
      }

      const newProducto = { nome, preco, quantidade, categoria };

      await Produto.create(newProducto);

      return res.json({
        mensagem: "Produto cadastrado com sucesso!",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao cadastrar produto");
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json("id invalido");
      }

      const productoExist = await Produto.findByPk(id);

      if (!productoExist) {
        return res.status(400).json("Produto não encontrado");
      }

      const { nome, categoria, quantidade, preco } = req.body;
      const productUpdated = {};

      if (!nome && !categoria && !quantidade && !preco) {
        return res
          .status(400)
          .json("Digite dados válidos para poder editar o produto");
      }

      if (nome) {
        if (typeof nome !== "string" || nome.trim().length < 2) {
          return res.status(400).json("Digite um nome válido");
        } else {
          productUpdated.nome = nome;
        }
      }

      if (categoria) {
        const categorias = [
          "eletrônicos",
          "roupas",
          "alimentos",
          "limpeza",
          "higiene",
        ];

        if (!categorias.includes(categoria)) {
          return res.status(400).json("Categoria invalida");
        } else {
          productUpdated.categoria = categoria;
        }
      }

      if (quantidade) {
        if (isNaN(quantidade) || quantidade <= 0) {
          return res.status(401).json("Quantidade invalida");
        } else {
          productUpdated.quantidade = quantidade;
        }
      }

      if (preco) {
        if (isNaN(preco) || preco <= 0) {
          return res.status(400).json("Preço invalido");
        } else {
          productUpdated.preco = preco;
        }
      }

      await Produto.update(productUpdated, { where: { id } });
      return res.json({
        message: "Produto Atualizado com sucesso",
        dados: `O produto: ${nome} com o Id: ${id} foi atualizado com sucesso!`,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao editar produto");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json("Id invalido");
      }

      const productoExist = await Produto.findByPk(id);

      if (!productoExist) {
        return res.status(400).json("Produto não encontrado");
      }

      const { nome } = productoExist;

      await productoExist.destroy();

      return res.json({
        message: `${nome} foi deletado com sucesso com o id ${id}`,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao deletar o produto");
    }
  }
}

export default new ProdutoController();
