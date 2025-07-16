import React, { useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  // Add todo
  const handleAdd = () => {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput('');
  };

  // Delete todo
  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Start editing todo
  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // Save edited todo
  const handleSave = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditingId(null);
    setEditText('');
  };

  // Toggle completed
  const toggleCompleted = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="container">
      <h1>Todo App</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="Enter a task"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleAdd();
          }}
        />
        <button className="add-btn" onClick={handleAdd}>Add</button>
      </div>

      <div className="todo-list">
        {todos.map(todo => (
          <div className="todo-item" key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
            />
            {editingId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={e => setEditText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSave(todo.id);
                }}
                autoFocus
              />
            ) : (
              <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
            )}

            <div className="actions">
              {editingId === todo.id ? (
                <button onClick={() => handleSave(todo.id)}>Save</button>
              ) : (
                <button onClick={() => handleEdit(todo)}>Edit</button>
              )}
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
