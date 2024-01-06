// app.js

const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 用于存储传入的字符串
let currentString = '';

// 当有新的WebSocket连接时
wss.on('connection', function connection(ws) {
  // 发送当前的字符串给新连接
  ws.send(currentString);
});

// 设置一个GET路由来接收新的字符串
app.get('/api/update-string', (req, res) => {
  const newString = req.query.newString;
  if (newString) {
    currentString = newString;

    // 广播新的字符串给所有连接的客户端
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(newString);
      }
    });

    res.json({ message: 'String updated' });
  } else {
    res.status(400).json({ error: 'New string is required' });
  }
});

app.get('/api/empty-string', (req, res) => {
  currentString = '';

  // 广播空白字符串给所有连接的客户端
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send('');
    }
  });

  res.json({ message: 'String emptied' });
});

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
