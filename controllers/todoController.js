var bodyParser = require("body-parser");

var data = [
  { item: "get milk" },
  { item: "work dog" },
  { item: "kick some coding ass" },
];

var urlencodedparser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get("/todo", function (req, res) {
    res.render("todo", { todos: data });
  });

  app.post("/todo", urlencodedparser, function (req, res) {
    var newItem = req.body.item;
    data.push({ item: newItem });
    res.json(data);
  });

  app.delete("/todo/:item", function (req, res) {
    // Implement delete functionality if needed
    data = data.filter(function(todo){
      return todo.item.replace(/ /g, '-') !== req.params.item;

    })
    res.json(data);
  });
};
