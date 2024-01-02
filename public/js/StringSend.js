// 获取当前URL的主机部分并设置为apiUrl的默认值
window.onload = function () {
  var currentUrl = window.location.href;
  var url = new URL(currentUrl);
  var host = url.hostname;
  document.getElementById('apiUrl').value = host;
}

function callAPI() {
  var apiUrl = document.getElementById('apiUrl').value;
  var apiPort = document.getElementById('apiPort').value;
  var apiString = document.getElementById('apiString').value;
  var apiParam = document.getElementById('apiParam').value;
  var fullUrl = 'http://' + apiUrl + ':' + apiPort + '/api/' + apiString + '=' + apiParam;

  fetch(fullUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById('response').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      document.getElementById('response').innerText = '发生错误：' + error;
    });
}

function empty() {
  var apiUrl = document.getElementById('apiUrl').value;
  var apiPort = document.getElementById('apiPort').value;
  var emptyUrl = 'http://' + apiUrl + ':' + apiPort + '/api/empty-string'
  fetch(emptyUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById('response').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      document.getElementById('response').innerText = '发生错误：' + error;
    });
}


// 获取复选框和输入框
var checkbox = document.getElementById('checkbox');
var inputField0 = document.getElementById('apiUrl');
var inputField1 = document.getElementById('apiPort');

// 监听复选框状态变化
checkbox.addEventListener('change', function () {
  if (checkbox.checked) {
    // 如果复选框被选中，设置输入框为可编辑
    inputField0.readOnly = false;

    inputField1.readOnly = false;
  } else {
    // 如果复选框未被选中，设置输入框为只读
    inputField0.readOnly = true;

    inputField1.readOnly = true;
  }
});


function clearTextarea() {
  document.getElementById("apiParam").value = "";
}