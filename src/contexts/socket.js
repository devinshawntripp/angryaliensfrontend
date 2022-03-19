import React from 'react'
import socketio from 'socket.io-client';
// import UserData from './UserData';
// http://localhost:8174/
// 'ws://47.186.214.152:80'
// 'https://34.135.152.196:8174
console.log(process.env.REACT_APP_URL)


export const Socket = socketio.connect(process.env.REACT_APP_URL, {transports: ['websocket']})
export const SocketContext = React.createContext();