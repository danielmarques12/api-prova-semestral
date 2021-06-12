### Prova Semestral - API - Disciplina de Microserviços

###### No primeiro acesso, pode levar vários segundos para carregar, devido à hospedagem gratuita (Dynos do Heroku dormindo 😴).
[Projeto no Heroku](https://ps13si-web.herokuapp.com/)


[Front-end do projeto](https://github.com/danielmarques12/web-prova-semestral)

## Detalhes de instalação

- Crie um banco de dados PostgreSQL e coloque as credenciais em um arquivo .env, de acordo com o arquivo .env.example (as credenciais do Cloudinary estão no .txt no portal, onde enviamos o projeto).

- As coleções de requisições do Insomnia se encontram na raíz do projeto.

- Execute: "yarn" para instalar as dependências do projeto (caso não tenha o yarn, para instalá-lo, execute: "npm install --global yarn").

- Execute: "yarn knex migrate:latest" para criar as tabelas no banco.

- Execute: "yarn dev" para iniciar a API.
