// Arquivo principal das rotas

const bodyParser = require('body-parser');
const teste = require('./teste.js');
const recipes = require('./receitasRoutes.js');
const expenses = require('./despesasRoutes.js');

module.exports = app => {
    app.use(
        bodyParser.json(),
        teste,
        recipes,
        expenses
    );
}