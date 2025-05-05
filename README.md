# Sistema de Vendas e Controle de Estoque

Este é um sistema de vendas e controle de estoque desenvolvido utilizando **Node.js**, **Express**, **Sequelize**, **Insomnia** e **MySQL**. 

O sistema foi criado para registrar vendas, controlar o estoque de produtos, aplicar descontos e garantir a integridade dos dados com atualização automática do estoque após cada venda.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript para servidores.
- **Express.js**: Framework para construção de APIs e servidores em Node.js.
- **Sequelize**: ORM (Object-Relational Mapping) para interação com o banco de dados MySQL.
- **MySQL**: Banco de dados relacional utilizado para armazenar as informações de produtos, vendas e usuários.
- **Insomnia**: Ferramenta para testar APIs RESTful.

## Funcionalidades

- **Cadastro de Vendas**: Permite registrar uma venda e associar um vendedor, um produto e a quantidade vendida.
- **Controle de Estoque**: Atualiza automaticamente a quantidade de produtos após cada venda.
- **Descontos**: Aplica descontos dinâmicos nas vendas, alterando o valor final.
- **Validação de Estoque**: Garante que as vendas não possam ser registradas quando não há estoque suficiente do produto.
- **Testes de API**: Realizados com Insomnia para validar as rotas e garantir o correto funcionamento da API.
