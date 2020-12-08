const db = require("../models");

module.exports = function(app){
    app.get("/api/todos", (req, res) => {
        db.todo.findAll({}).then((dbTodo) => {
            res.json(dbTodo);
        })
    });
}