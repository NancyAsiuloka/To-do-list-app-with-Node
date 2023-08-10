const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://test:test@todo.reebbkv.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

const todoSchema = new mongoose.Schema({
  item: String
});

const Todo = mongoose.model('Todo', todoSchema);

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/todo", function (req, res) {
  Todo.find({}, (err, todos) => {
    if (err) {
      console.error('Error fetching todos:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.render("todo", { todos: todos });
    }
  });
});

app.post("/todo", function (req, res) {
  const newItem = req.body.item;
  const item = new Todo({ item: newItem });

  item.save()
    .then(() => {
      console.log('Item saved');
      res.redirect('/todo'); // Redirect to the todo page
    })
    .catch((error) => {
      console.error('Error saving item:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.delete("/todo/:item", function (req, res) {
  const itemToDelete = req.params.item;

  Todo.deleteOne({ item: itemToDelete }, (err) => {
    if (err) {
      console.error('Error deleting item:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Item deleted');
      res.sendStatus(200);
    }
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});
