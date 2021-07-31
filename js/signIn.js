var obj = {
  signInButton: document.getElementById("signInButton"),
  username: document.getElementById("username"),
  password: document.getElementById("password"),
  rpassword: document.getElementById("rpassword"),
  verifyCode: new GVerify("v_container"),
  rejectButton: function () {
    var that = this;
    var str = "";
    function addButtonTwoAjax() {
      var res = that.verifyCode.validate(
        document.getElementById("code_input").value
      );
      if (!res) {
        alert("验证码错误");
        that.verifyCode.refresh();
      } else {
        var url = "http://localhost:8080/reg";
        str =
          "name=" +
          that.username.value +
          "&" +
          "pass=" +
          that.password.value +
          "&" +
          "rpass=" +
          that.rpassword.value;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.status == 200 && xhr.readyState == 4) {
            //json字符串转对象
            var json = JSON.parse(xhr.responseText);
            if (json.ok) {
              location.replace("login.html");
              alert("注册成功！");
            } else {
              alert("失败" + ",   " + json.msg);
            }
          }
        };
        xhr.open("post", url, true);
        //这句话特别重要!!!
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded;charset=UTF-8"
        );
        xhr.send(str);
      }
    }
    that.signInButton.addEventListener("click", addButtonTwoAjax);
  },
};

function main() {
  obj.rejectButton();
}
main();
