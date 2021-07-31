var obj = {
  loginButton: document.getElementById("loginButton"),
  username: document.getElementById("username"),
  password: document.getElementById("password"),
  verifyCode: new GVerify("v_container"),
  loadButton1: function () {
    var that = this;
    function addButtonTwoAjax() {
      var res = that.verifyCode.validate(
        document.getElementById("code_input").value
      );
      if (!res) {
        alert("验证码错误");
        that.verifyCode.refresh();
      } else {
        var url = "http://localhost:8080/login";
        var flag;
        url += "?name=" + that.username.value + "&pass=" + that.password.value;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.status == 200 && xhr.readyState == 4) {
            var json = JSON.parse(xhr.responseText);
            //对于JSON字符串的处理。
            if (json.ok) {
              location.replace("main.html");
            } else {

              alert("失败" + ",   " + json.msg);
    
            }
          }
        };
        xhr.open("get", url, true);
        //支持cookie跨域 3
        xhr.withCredentials = true;
        xhr.send(null);
      }
    }
    that.loginButton.addEventListener("click", addButtonTwoAjax);
  },
};
function main() {
  obj.loadButton1();
}
main();

