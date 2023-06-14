const express = require('express');
const app = express();

app.use(express.json());

let todos = [];

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/stats', (req, res) => {
    const completed = todos.filter((item) => item.completed == true)
    
    res.json({
        all_todos:todos.length,
        count_of_completed:completed.length,
        count_of_uncompleted:todos.length - completed.length,

    });
})

// get-by-id-todo
app.get('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const todo = todos.find((todo) => todo.id === todoId);

  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
  } else {
    res.json(todo);
  }
});

// create-todo
app.post('/todos', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json(todos);
});

// edit-todo
app.put('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }

  todos[todoIndex] = updatedTodo;
  res.json(updatedTodo);
});

// delete-todo
app.delete('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.json(deletedTodo);
});

// mark-as-completed
app.put('/todos/:id/complete', (req, res) => {
  const todoId = req.params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }

  todos[todoIndex].completed = true;
  res.json(todos[todoIndex]);
});




// mark-as-not-completed
app.put('/todos/:id/incomplete', (req, res) => {
  const todoId = req.params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }

  todos[todoIndex].completed = false;
  res.json(todos[todoIndex]);
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
