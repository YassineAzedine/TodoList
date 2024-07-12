// src/components/TodosPage.js
'use client'
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { Add, Edit, Delete, ExitToApp } from '@mui/icons-material'; // Import ExitToApp icon for sign-out
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

const TodosPage = () => {
  const router = useRouter()

  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
  ]);
  const [open, setOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ id: null, text: '', completed: false });
  const [isEditing, setIsEditing] = useState(false);

  const handleOpen = (todo) => {
    setIsEditing(!!todo);
    setCurrentTodo(todo || { id: null, text: '', completed: false });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTodo({ id: null, text: '', completed: false });
  };

  const handleChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  const handleSave = () => {
    if (isEditing) {
      setTodos(todos.map(todo => (todo.id === currentTodo.id ? currentTodo : todo)));
    } else {
      setTodos([...todos, { ...currentTodo, id: todos.length + 1 }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleCompleted = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleSignOut = () => {
    // Implement sign-out logic here
    localStorage.removeItem('token');
  // Redirect user to the home page or any other page
  toast.success('Sign Out successful! Redirecting...', {
    autoClose: 3000,
  });
  setTimeout(() => {
    router.push('/'); // Redirect to the home page after sign-out
  }, 3000); 


  // Optionally clear any other user-related data or state
  // Example: Clear user session, reset authentication state, etc.


  };

  return (
    <>

      <AppBar position="static">

        <Toolbar>
      <ToastContainer />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo List
          </Typography>
          <Button color="inherit" startIcon={<Add />} onClick={() => handleOpen(null)}>
            Add Todo
          </Button>
          <IconButton color="inherit" onClick={handleSignOut}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" component="div" sx={{ mb: 3, textAlign: 'center' }}>
            Your Tasks
          </Typography>
          <List>
            {todos.map((todo) => (
              <ListItem
                key={todo.id}
                sx={{
                  borderBottom: '1px solid #ddd',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleToggleCompleted(todo.id)}
                  color="primary"
                />
                <ListItemText primary={todo.text} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(todo)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(todo.id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
        >
          <DialogTitle>{isEditing ? 'Edit Todo' : 'Add Todo'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Todo"
              type="text"
              fullWidth
              value={currentTodo.text}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default TodosPage;
