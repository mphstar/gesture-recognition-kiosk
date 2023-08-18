import { io } from 'socket.io-client';
import UrlServer from './urlServer';

// "undefined" means the URL will be computed from the `window.location` object
const URL = UrlServer;

export const socket = io(URL, {
    autoConnect: true,
});