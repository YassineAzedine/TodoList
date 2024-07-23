import axios from 'axios';

const API_BASE_URL = 'http://localhost:4040/api';

const registerUser = async (email, password, username) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, { email, password, username });
    return response.data;
  } catch (error) {
    throw new Error('Failed to register user');
  }
};

const logRegisterEvent = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/log`, { event: 'User Registration', email });
    return response.data;
  } catch (error) {
    throw new Error('Failed to log registration event');
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Failed to login user');
  }
};

export { registerUser, logRegisterEvent, loginUser };
