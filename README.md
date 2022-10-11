# Challenge Back-end Alura!

São 3 semanas de desafio, sendo:

- Semana 1: implementando uma API REST.
- Semana 2: Mudanças na API e novas funcionalidades.
- Semana 3: Segurança e deploy da API

Em cada semana, tem um board do trello pra seguir, seguindo modelo kanban.

# Status do projeto:
[X] - Semana 1: CRUD de despesas e receitas  
[ ] - Semana 2: ...  
[ ] - Semana 3: ...  

# Diário de bordo
Dia 07/10/2022  
Na semana 2, percebi que se eu continuasse usando as controllers, pra tudo, viraria bagunça. Então decidi dar atenção a modelar meus arquivos. Usei como base esse artigo -> https://medium.com/@stroklabs/como-organizar-e-estruturar-projetos-com-node-js-4845be004899

Com isso, criei as Services pra cuidar das regras de negócio. E as Repositories pra cuidar da comunicação com o banco de dados.

Pra usar o exception handler, é necessário instalar a biblioteca 'npm install express-async-errors'. Quando der um throw exception em qualquer lugar da aplicação, ele executa o que está no index.js

Dia 11/10/2022  
Realizei um code review com um colega, a partir do que eu já tinha feito. E fui recebendo vários insights e dicas referente ao projeto, no fim, resolvi chutar o balde e alterar tudo pra typescript e utilizar o Prisma ao invés do sequelize. 
- Incluso typescript
- Alterado o ORM para o Prisma
- Incluso a pasta 'messages', responsável pela classe dos meus erros.
- Criado as interfaces de tipagens
- Consequentemente, alterado todo o projeto adicionando as tipagens. Além de alterado algumas validações durante o processo.