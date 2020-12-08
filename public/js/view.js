$(document).ready(function () {
    const $todoContainer = $(".todo-container");
    let $newItemInput = $("#dotoInput");

    $(document).on("submit", "#todo-form", insertTodo);
    $(document).on("click", "button.delete", deleteTodo);
    $(document).on("click", "button.complete", toggleComplete);

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



    function insertTodo(e){
        e.preventDefault(); // Prevents the default Action.
        console.log($newItemInput.val());
        const todo = {
            text: $newItemInput.val().trim(),
            complete: false
        };

        $.post("api/todos", todo, getTodos);
        $newItemInput.val("");
    }

    function deleteTodo(e) {
        e.stopPropagation(); // Stop events from bubbling up the event chain.
        
        const id = $(this).data("id");
        console.log(id);
        $.ajax({
            method: "DELETE",
            url: "/api/todos/" + id
        }).then(getTodos);

    }

     // Toggles complete status
  function toggleComplete(e) {
    e.stopPropagation();
    const todo = $(this).parent().data("todo");
    console.log(todo);
    todo.complete = !todo.complete;
    updateTodo(todo);
  }

   // This function updates a todo in our database
   function updateTodo(todo) {
    $.ajax({
      method: "PUT",
      url: "/api/todos",
      data: todo
    }).then(getTodos);
  }

});

