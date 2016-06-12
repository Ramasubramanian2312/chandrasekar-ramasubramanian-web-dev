module.exports = function (app) {
    var mongoose = require("mongoose");
    var TodoSchema = mongoose.Schema({
        priority: String,
        title: String,
        todo: String
    });

    var Todo = mongoose.model("Todo", TodoSchema);

    app.get("/api/todos", findAllTodos);

    function findAllTodos(req, res) {
        Todo
            .find()
            .then(
                function (todos) {
                    res.json(todos);
                }
            );
    }

/*    Todo.create({"priority": 1, "title": "CS5610", "todo": "Teach angular js"});
    Todo.create({"priority": 2, "title": "CS5200", "todo": "Data Modelling"});
    Todo.create({"priority": 3, "title": "CS1500", "todo": "Algorithms and Data Structures"});
    Todo.create({"priority": 4, "title": "CS1600", "todo": "Algorithms and Data Structures"});
    Todo.create({"priority": 5, "title": "CS1700", "todo": "Algorithms and Data Structures"});
    Todo.create({"priority": 6, "title": "CS1800", "todo": "Algorithms and Data Structures"});
    Todo.create({"priority": 7, "title": "CS1900", "todo": "Algorithms and Data Structures"});*/
}
