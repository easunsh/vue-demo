import axios from 'axios';
import { io } from 'socket.io-client';
import { API_BASE_URL } from './app.config';

export const apiHttpClient = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * socket
 * 可以监听服务端发送来的事件
 * 也可以向服务端发送事件
 */
export const socket = io(API_BASE_URL);
