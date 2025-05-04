import Produtos from "../models/produtosModel";
import User from "../models/userModel";
import Vendas from "../models/vendasModel";

class VendasController {
  async index(req, res) {
    try {
      const vendas = await Vendas.findAll({
        include: [
          {
            model: Produtos,
            as: "produto",
          },
          {
            model: User,
            as: "vendedor",
          },
        ],
      });

      if (vendas.length === 0) {
        return res.status(404).json("Nenhuma venda foi feita");
      }

      return res.json(vendas);
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json("Não foi possivel buscar todas as vendas feitas");
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json("Id invalido");
      }

      const vendaExist = await Vendas.findByPk(id, {
        include: [
          {
            model: Produtos,
            as: "produtos",
          },
          {
            model: User,
            as: "vendedor",
          },
        ],
      });

      if (!vendaExist) {
        return res.status(400).json("essa venda não existe");
      }

      return res.json(vendaExist);
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao procurar os dados dessa venda");
    }
  }

  async create(req, res) {
    try {
      let valor;
      const vendedorId = req.user.id;

      const { produtoId, quantidade, desconto } = req.body;

      if (!produtoId || !quantidade || !desconto) {
        return res.status(401).json("Nenhum campo pode ficar vazio");
      }

      if (isNaN(produtoId) || produtoId <= 0) {
        return res.status(401).json("Id do produto invalido");
      }

      if (isNaN(quantidade) || quantidade <= 0) {
        return res.status(401).json("Quantidade invalida");
      }

      if (isNaN(desconto)) {
        return res.status(401).json("Digite um desconto válido");
      }

      const producto = await Produtos.findByPk(produtoId);

      if (!producto) {
        return res.status(400).json("Produto não encontrado");
      }

      if (producto.quantidade < quantidade) {
        return res
          .status(401)
          .json("Quantidade invalida, pouco estoque do produto");
      }

      valor = quantidade * producto.preco;

      let descontoTotal = 0;

      if (desconto > 0) {
        descontoTotal = valor * (desconto / 100);
        valor -= descontoTotal;
      }

      const newVendas = {
        produtoId,
        vendedorId,
        quantidade,
        valor,
        descontoTotal,
      };

      await Vendas.create(newVendas);
      await producto.update({ quantidade: producto.quantidade - quantidade });
      return res.json(newVendas);
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao fazer a venda");
    }
  }
}

export default new VendasController();
