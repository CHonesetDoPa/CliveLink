# CliveLink
CliveLink 为无声系主播提供与观众的交互方式，只需要额外的一台手机

# 如何部署CliveLink 
首先确保你已经安装了node  
接下来，运行以下命令来获取依赖库
> npm i ws express   

运行以下命令来启动CliveLink
> node index.js

确保你的防火墙没有阻挡26306端口  
浏览器打开localhost:26306  
手机打开“你的电脑的IP:26306/StringSend.html”  

# 如何使用
在OBS中添加浏览器，地址设置为localhost:26306，手机浏览器打开“你的电脑的IP:26306/StringSend.html”   
在手机上输入文字，按下“发送”将文字推送到电脑，按下“清空”将电脑端的文字清除，按下“清除”则会清空手机文本框的内容。  

# 技术使用
Nodejs websocket express