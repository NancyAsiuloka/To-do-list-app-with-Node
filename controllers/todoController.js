var bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://test:test@todo.reebbkv.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');

    // Create a schema - this is like a blueprint
    const todoSchema = new mongoose.Schema({
      item: String
    });

    const Todo = mongoose.model('Todo', todoSchema);
    const itemOne = new Todo({ item: 'buy flowers' });

    itemOne.save()
      .then(() => {
        console.log('Item saved');
      })
      .then(() => {
        mongoose.connection.close(); // Close the connection after saving
      })
      .catch((error) => {
        console.error('Error saving item:', error);
      });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


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
