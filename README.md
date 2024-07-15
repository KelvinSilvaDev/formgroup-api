## Sumário

1. [Introdução](#introdu%C3%A7%C3%A3o)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Requisitos de Instalação](#requisitos-de-instala%C3%A7%C3%A3o)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Autenticação](#autentica%C3%A7%C3%A3o)
6. [Funcionalidades da API](#funcionalidades-da-api)
    - [Usuários](#usu%C3%A1rios)
    - [Filmes](#filmes)
7. [Endpoints da API](#endpoints-da-api)
    - [Usuários](#endpoints-de-usu%C3%A1rios)
    - [Filmes](#endpoints-de-filmes)
8. [Front-end](#front-end)
9. [Testes](#testes)
10. [Considerações de Segurança](#considera%C3%A7%C3%B5es-de-seguran%C3%A7a)
11. [Execução do Projeto](#execu%C3%A7%C3%A3o-do-projeto)
12. [Evoluções Futuras](#evolu%C3%A7%C3%B5es-futuras)
13. [Deploy](#deploy)
14. [Contato](#contato)

## Introdução

Este documento descreve o desenvolvimento de uma API e uma aplicação front-end para o Desafio Globo. O objetivo é criar uma API que o frontend possa consultar para exibir seu conteúdo. A aplicação permitirá o cadastro e gerenciamento de usuários, assim como a listagem, cadastro, votação e detalhamento de filmes.

## Tecnologias Utilizadas

- **Back-end**: Nestjs
- **Front-end**: Next.js
- **Banco de Dados**: Postgres
- **Autenticação**: JWT (JSON Web Token)

## Requisitos de Instalação

1. **Node.js** (versão mínima: 20.x)
2. **NPM** ou **Yarn** (para gerenciamento de pacotes)
3. **Banco de Dados Relacional**: Postgres

## Estrutura do Projeto

### Back-end


```lua
/backend
|-- /config
|   |-- db.config.js
|   |-- auth.config.js
|-- /controllers
|   |-- user.controller.js
|   |-- movie.controller.js
|-- /middlewares
|   |-- auth.middleware.js
|-- /models
|   |-- user.model.js
|   |-- movie.model.js
|-- /routes
|   |-- user.routes.js
|   |-- movie.routes.js
|-- /services
|   |-- auth.service.js
|-- app.js
|-- server.js

```

### Front-end

```lua
/frontend
|-- /src
|   |-- /components
|   |-- /pages
|   |-- /services
|   |-- App.js
|   |-- index.js
```

## Autenticação

A autenticação será realizada utilizando JWT. O token JWT será recebido no formato Bearer e será utilizado para validar as requisições aos endpoints protegidos.

## Funcionalidades da API

### Usuários

A API permitirá o cadastro, edição e exclusão lógica (desativação) de usuários com dois níveis de acesso: Usuário e Admin. Somente o administrador pode cadastrar novos usuários.

### Filmes

A API permitirá:

- Cadastro de filmes (apenas para administradores).
- Votação nos filmes por usuários (pontuação de 0 a 4).
- Listagem de filmes com filtros por diretor, nome, gênero e atores.
- Detalhamento dos filmes, incluindo a média dos votos.

## Endpoints da API

### Endpoints de Usuários

- **Cadastro de Usuário (Admin)**
    - `POST /users`
- **Login de Usuário**
    - `POST /login`
- **Edição de Usuário**
    - `PUT /users/:id`
- **Exclusão Lógica de Usuário**
    - `DELETE /users/:id`

### Endpoints de Filmes

- **Cadastro de Filme (Admin)**
    - `POST /movies`
- **Voto em Filme**
    - `POST /movies/:id/vote`
- **Listagem de Filmes**
    - `GET /movies`
- **Detalhe do Filme**
    - `GET /movies/:id`

## Front-end

### Páginas

- **Login**
    - Página para login e logout de usuários.
- **Filmes**
    - Listagem de filmes com filtros.
    - Cadastro de novo filme (apenas para administradores).
    - Detalhe do filme com todas as informações e média dos votos.

O Backend está melhor documentado no Swagger dentro da própria api e pode ser acessado através do endpoint `/api` em qualquer navegador.



### Componentes

Componentes React reutilizáveis para formulários, listagens e detalhes.

## Considerações de Segurança

- **Autenticação JWT**: Tokens serão utilizados para validar todas as requisições protegidas.
- **Senhas**: Utilização de hashing (bcrypt) para armazenar senhas no banco de dados.

## Execução do Projeto

### Backend

1. Clonar o repositório
2. Instalar dependências: `npm install` ou `yarn install`
3. Configurar o banco de dados no prisma `npx prisma migrate generate`
4. Executar migrações: `npx prisma migrate dev`
5. Iniciar o servidor: `npm start:dev`

### Frontend

1. Clonar o repositório
2. Instalar dependências: `npm install` ou `yarn install`
3. Iniciar a aplicação: `npm run dev


## Deploy

O deploy do frontend foi realizado na vercel e pode ser acessado através do link:
https://stormgroup-movies.vercel.app/

O backend e o banco de dados por sua vez estão hospedados na Render e a api online pode ser acessada através do seguinte link:
https://formgroup-api.onrender.com/api

Infelizmente ambos os repositórios usam planos gratuitos desses serviços e por conta disso problemas de performance podem ocorrer durante o uso da aplicação online.


## Evoluções Futuras

- Implementação de cache para melhorar a performance das requisições.
- Implementação de busca por similaridade para recomendações de filmes.
- Melhoria na interface do usuário com design responsivo e acessível.
- Reelaboração de componentes para se adequar  a padrões melhores e boas práticas

## Contato

Para dúvidas ou mais informações, entre em contato com nossa equipe através do e-mail: kelvinsilvadev@gmail.com.