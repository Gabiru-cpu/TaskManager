# Sistema de Lista de Tarefas

Este é um projeto que visa criar um sistema de lista de tarefas onde os usuários podem criar e gerenciar diferentes tipos de tarefas, como atividades escolares, compras no mercado, entre outros. O sistema possui um backend em .NET com autenticação para sistema de logins e um frontend em Angular com Bootstrap para a interface com o usuário.

## Tecnologias Utilizadas

- **Backend:**
  - .NET Core
  - Entity Framework Core
  - MySQL
  - JWT (JSON Web Tokens) para autenticação

- **Frontend:**
  - Angular
  - Bootstrap

## Funcionalidades

- Autenticação de usuários
- Criação, edição e exclusão de listas de tarefas
- Adição, edição e exclusão de tarefas em uma lista
- Visualização de detalhes de uma tarefa
- Marcação de tarefas como concluídas

## Para conseguir rodar

- Configure seu Banco de dados, se for usar o MySql é só criar um banco com nome " newwebapi " ou mudar no appsettings.json do back-end
- No console do nuGet no back-end use o comando: " dotnet restore " para restaurar os pacotes
- Ainda no back-end digite no console do nuGet: " Update-Database " (Importante ter criado o seu banco dados do projeto)
- No Console dentro do projeto do Front use o comando: " npm-install " para baixar as dependencias
- Caso ele peça para usar o comando: " npm audit fix " recomendo que use
- Rode o front com o comando: " ng serve --open "
