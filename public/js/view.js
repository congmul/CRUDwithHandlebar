$(document).ready(function () {
    const $todoContainer = $(".todo-container");

    // Our initial todos array
    let todos = [];

    getTodos();

    // This function resets the todos displayed with new todos from the database
    function initializeRows() {
        $todoContainer.empty();
        const rowsToAdd = [];
        for (let i = 0; i < todos.length; i++) {
            rowsToAdd.push(createNewRow(todos[i]));
        }
        $todoContainer.prepend(rowsToAdd);
    }

    // This function grabs todos from the database and updates the view
    function getTodos() {
        $.get("/api/todos", function (data) {
            todos = data;
            console.log(data);
            initializeRows();
        });
    }


    // This function constructs a todo-item row
    function createNewRow(todo) {
        const $newInputRow = $(
            [
                "<li class='list-group-item todo-item'>",
                "<span>",
                todo.text,
                "</span>",
                "<input type='text' class='edit' style='display: none;'>",
                "<button class='delete btn btn-danger'>x</button>",
                "<button class='complete btn btn-primary'>✓</button>",
                "</li>"
            ].join("")
        );
        console.log(todo.id);
        $newInputRow.find("button.delete").data("id", todo.id);
        $newInputRow.find("input.edit").css("display", "none");
        $newInputRow.data("todo", todo);
        if (todo.complete) {
            $newInputRow.find("span").css("text-decoration", "line-through");
        }
        return $newInputRow;
    }


});

