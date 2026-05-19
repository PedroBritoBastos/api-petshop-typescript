# Sobre o projeto

Este projeto é uma API de petshop feita em typescript para fins de estudo. 

# Arquitetura

A arquitetura escolhida para este projeto foi a de desenvolvimento em módulos para facilitar a separação dos domínios. A estrutura de camadas desse projeto foi feita usando o padrão Repository Pattern:

- Controllers -> lidam com as requisições do usuário e devolvem as respostas ao cliente.
- Services -> camada das regras de negócio
- Repository -> camada que se comunica com o banco de dados.

# Banco de Dados

- O banco escolhido foi o SQLite por ser um projeto mais simples e por poder salvar os dados no próprio projeto sem fazer conexão com um banco externo.

# Como usar o projeto

- use: git clone <nome do repositório> main
- instale as dependências (node modules)
- no terminal faça o comando: npm run dev

# Rotas

## Rotas de clientes
<ul>
  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/GET-blue" alt="GET">
    /clients → resgata todos os clientes
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/GET-blue" alt="GET">
    /clients/:id → resgata um cliente pelo ID
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/POST-green" alt="POST">
    /clients → cria um cliente
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/PUT-orange" alt="PUT">
    /clients/:id → atualiza um cliente
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/DELETE-red" alt="DELETE">
    /clients/:id → deleta um cliente
  </li>
</ul>

## Rotas de pets
<ul>
  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/GET-blue" alt="GET">
    /pets → lista todos os pets
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/GET-blue" alt="GET">
    /pets/:id → resgata um pet pelo ID
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/POST-green" alt="POST">
    /pets → cria um novo pet
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/PUT-orange" alt="PUT">
    /pets/:id → atualiza um pet
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/DELETE-red" alt="DELETE">
    /pets/:id → remove um pet
  </li>
</ul>

## Rotas auth

<ul>
  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/POST-green" alt="POST">
    /auth/login → autentica o usuário e retorna um token JWT
  </li>
</ul>


