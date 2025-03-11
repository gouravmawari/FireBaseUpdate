const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const admin = require("./firebase.config");
const app = require("./app");
const server = http.createServer(app);
const db = admin.firestore();
const io = socketIo(server, {
    cors: {
      origin: "*",
    },
  });
  let onlineUsers = {};
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log(`User ${userId} connected`);
  });
  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    const chatId = [senderId, receiverId].sort().join("_");

    const newMessage = {
      senderId,
      receiverId,
      message,
      timestamp: new Date(),
    };

    await db.collection("chats").doc(chatId).collection("messages").add(newMessage);

    if (onlineUsers[receiverId]) {
      io.to(onlineUsers[receiverId]).emit("receiveMessage", newMessage);
    }
  });

  socket.on("disconnect", () => {
    Object.keys(onlineUsers).forEach((key) => {
      if (onlineUsers[key] === socket.id) {
        delete onlineUsers[key];
        console.log(`User ${key} went offline`);
      }
    });
  });
});

module.exports = {  server };