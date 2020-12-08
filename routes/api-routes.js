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
            console.log(dbTodo);
            res.json(dbTodo);
        });
    });

    app.delete("/api/todos/:id", (req, res) => {
        console.log(req.params.id);
        db.todo.destroy({
            where: {
                id: req.params.id
            }
        }).then((dbTodo) => {
            console.log(dbTodo);
            res.json(dbTodo);
        })
    })
}