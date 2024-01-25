import axios from "axios";
import { BACK_SERVER_URL } from '../../config.js';

export const createUser = async (userData) => {
    try {
      const res = await axios.post(
        `${BACK_SERVER_URL}/user/signUp`,
        userData
      );
      return res;
    } catch (error) {
      return error;
    }
  };
  
  export const getUser = async (userData) => {
    try {
      const res = await axios.post(
        `${BACK_SERVER_URL}/user/signIn`,
        userData
      );
      return res;
    } catch (error) {
      return error;
    }
  };
  
  export const forgotPassword = async (email) => {
    try {
      const res = await axios.post(
        `${BACK_SERVER_URL}/user/forgotPassword`,
        { email }
      );
      return res.data;
    } catch (error) {
      return error;
    }
  };
  
  export const resetPassword = async (password, token) => {
    try {
      const res = await axios.put(`${BACK_SERVER_URL}/user/resetPassword`, {
        password,
        token,
      });
      return res;
    } catch (error) {
      return error;
    }
  };  

export const createBooks = async (data, token) => {
    try {
        const headers = {
        Authorization: `Bearer ${token}`,
        };
        const res = await axios.post(
            `${BACK_SERVER_URL}/books`,
            data,
            { headers }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const deleteBook = async (id, token) => {
    try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.delete(
            `${BACK_SERVER_URL}/books/${id}`, { headers }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const editBook = async (id, data, token) => {
    try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.put(
            `${BACK_SERVER_URL}/books/${id}`,
            data, { headers }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const fetchBook = async (id, token) => {
    try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
            `${BACK_SERVER_URL}/books/${id}`, { headers }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const getBooks = async (token) => {
    try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
            `${BACK_SERVER_URL}/books`, { headers }
        );
        return res;
    } catch (error) {
        return error;
    }
};