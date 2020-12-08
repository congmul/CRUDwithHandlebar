const db = require("../models");

module.exports = function(app){
    app.get("/api/todos", (req, res) => {
        db.todo.findAll({}).then((dbTodo) => {
            res.json(dbTodo);
        })
    });

    app.post("/api/todos", (req, res) => {
        console.log(req.body);
        db.todo.create(req.body).then((dbTodo) => {
            res.json(dbTodo);
        });

    })
}