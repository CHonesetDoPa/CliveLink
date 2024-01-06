// 检测用户代理中是否包含 "Mobile" 或 "Android" 关键词
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  // 如果是手机设备，进行页面跳转
  window.location.href = 'StringSend.html';
}


const ws = new WebSocket('ws://localhost:3000');
      let intervalId;

      ws.onmessage = function(event) {
        const receivedString = event.data;
        const container = document.getElementById('string-container');
        if (intervalId) {
          clearInterval(intervalId); // 清除之前的定时器
          container.textContent = ''; // 清空之前的内容
        }
        let index = 0;
        const speed = 100; // 设置打印速度，单位为毫秒
        const totalDuration = receivedString.length * speed; // 总的打印时间
        const startTime = performance.now(); // 记录开始时间
        intervalId = setInterval(function() {
          const elapsedTime = performance.now() - startTime; // 计算已经经过的时间
          const currentIndex = Math.floor((elapsedTime / totalDuration) * receivedString.length); // 计算当前应该显示的字符位置
          container.textContent = receivedString.substring(0, currentIndex); // 更新显示的内容
          if (currentIndex >= receivedString.length) {
            clearInterval(intervalId); // 如果已经显示完所有字符，清除定时器
          }
        }, speed); // 每100毫秒更新一次显示的内容
      };