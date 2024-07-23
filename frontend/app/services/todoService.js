import axios from 'axios';

const API_BASE_URL = 'http://localhost:4040/api'; // Replace with your API base URL

const TodoService = {
  async createTodo(todoData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/todo`, todoData);
    
      return response.data.todo;
    } catch (error) {
      throw new Error(`Failed to create todo: ${error.message}`);
    }
  },

  async getTodos() {
    try {
      const response = await axios.get(`${API_BASE_URL}/todo`);
      return response.data.todos;
    } catch (error) {
      throw new Error(`Failed to fetch todos: ${error.message}`);
    }
  },

  async getTodoById(id) {

    try {
      const response = await axios.get(`${API_BASE_URL}/todo/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch todo with ID ${id}: ${error.message}`);
    }
  },

  async updateTodo(id, {text , completed}) {
       

    try {
     
      const response = await axios.put(`${API_BASE_URL}/todo/${id}`, {text , completed});
      console.log("response" , response);

      return response.data.todo;
    } catch (error) {
      throw new Error(`Failed to update todo with ID ${id}: ${error.message}`);
    }
  },

  async deleteTodo(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/todo/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete todo with ID ${id}: ${error.message}`);
    }
  },
  async updatedCompleted(id ,{text ,completed}){
    console.log("completed" , completed);
    try{
  const response = await axios.put(`${API_BASE_URL}/todo/${id}` , {text , completed : !completed})
  return response.data.todo
    }catch(error){
     throw new Error('Failed to update completed status ')
    }

  }
};

export default TodoService;
