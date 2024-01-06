// app.js

const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `[${hours}:${minutes}:${seconds}]`;
}




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
        // 获取当前时间
        const currentTime = new Date();
        // 格式化时间
        const formattedTime = formatTime(currentTime);
        console.log(formattedTime, 'String:', newString);
      }
    });

    res.json({ message: 'String updated' });
  } else {
    res.status(400).json({ error: 'New string is required' });
    // 获取当前时间
    const currentTime = new Date();
    // 格式化时间
    const formattedTime = formatTime(currentTime);
    console.log(formattedTime, 'Error:New string is required');
  }
});

app.get('/api/connection-test', (req, res) => {
  const newString = 'Device Connected';
  if (newString) {
    currentString = newString;
    // 广播新的字符串给所有连接的客户端
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(newString);
        // 获取当前时间
        const currentTime = new Date();
        // 格式化时间
        const formattedTime = formatTime(currentTime);
        const userAgent = req.get('User-Agent');
        console.log(formattedTime, 'Command:Device Connected');
        console.log(formattedTime, 'Device Info:',userAgent);
      }
    });

    res.json({ message: 'Device Connected' });
  } else {
    res.status(400).json({ error: 'Error Connection' });
  }
});

app.get('/api/empty-string', (req, res) => {
  currentString = '';

  // 广播空白字符串给所有连接的客户端
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send('');
      // 获取当前时间
      const currentTime = new Date();
      // 格式化时间
      const formattedTime = formatTime(currentTime);
      console.log(formattedTime, 'Command:Clear');
    }
  });

  res.json({ message: 'String emptied' });
});




// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`-------- CliveLink --------`);
  console.log(`Loading CliveLink Service.`);
  console.log(`Service is running on port ${PORT}`);
  console.log(`Messages:`);
});
