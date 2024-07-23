// src/components/TodosPage.js
'use client';
import React, { useState, useEffect } from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import todoService from '../services/todoService'; // Import your todo service

const TodosPage = () => {
  const router = useRouter();

  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);  
  const [currentTodo, setCurrentTodo] = useState({  text: '', completed: false });
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const todos = await todoService.getTodos();

      setTodos(todos);
    } catch (error) {
      console.error('Error loading todos:', error);
      toast.error('Failed to load todos. Please try again.');
    }
  };

  const handleOpen = (todo) => {

    setIsEditing(!!todo);
    setCurrentTodo(todo || { text: '', completed: false });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTodo({  text: '', completed: false });
  };

  const handleChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  const handleSave = async () => {
    console.log("currentTodo" , currentTodo)

    try {
      if (isEditing) {
       
        const updatedTodo =    await todoService.updateTodo(currentTodo._id, currentTodo);
       setTodos(todos.map((todo)=> todo._id === updatedTodo._id ? updatedTodo : todo ))

      } else {
       const newTodo =  await todoService.createTodo(currentTodo);
       setTodos([...todos , newTodo])
      }
      // loadTodos();
      handleClose();
      toast.success(`${isEditing ? 'Todo updated' : 'Todo added'} successfully!`);
    } catch (error) {
      console.error('Error saving todo:', error);
      toast.error('Failed to save todo. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
     await todoService.deleteTodo(id);
     toast.success('Todo deleted successfully!');
     setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('Failed to delete todo. Please try again.');
    }
  };

  const handleToggleCompleted = async ({text , _id , completed}) => {
    try {
  const task =  await todoService.updatedCompleted(_id, {text , completed});

      const todoToToggle = todos.find((todo) => todo._id === _id);
      if(todoToToggle){
        loadTodos();
         if(task.completed == true){
          toast.success('task completd', {
            autoClose: 2000,
          });
         }else{
          toast.info('task Not completd', {
            autoClose: 2000,
          });
         }
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
      toast.error('Failed to toggle todo. Please try again.');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    toast.success('Sign Out successful! Redirecting...', {
      autoClose: 2000,
    });
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <>
      <AppBar position="static">
      <ToastContainer  position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>

        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo List
          </Typography>
          <Button color="inherit" startIcon={<AddIcon />} onClick={() => handleOpen(null)}>
            Add Todo
          </Button>
          <IconButton color="inherit" onClick={handleSignOut}>
            <ExitToAppIcon />
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
                key={todo._id}
                sx={{
                  borderBottom: '1px solid #ddd',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleToggleCompleted(todo)}
                  color="primary"
                />
                <ListItemText primary={todo.text} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(todo)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(todo._id)}>
                    <DeleteIcon />
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
