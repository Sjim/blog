(function () {
  // canvas 实现 watermark
  function __canvas_clear_water_mark() {
    var canvas = document.getElementById("watermark");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
      const angle = -20;
      const text = "181250093 柳斯宁";
      ctx.drawImage(img, 0, 0);
      ctx.font = "24px 楷体";
      const hex = "#FF0000";
      ctx.fillStyle = hex;
      ctx.globalAlpha = 0.6;
      ctx.textAlign = "right";
      ctx.rotate((Math.PI / 180) * angle);
      ctx.fillText(text, canvas.width - 300, canvas.height - 100);
    };
    img.src = "../photo/timg.png";
  }
  function __canvas_hiden_water_mark() {
    var canvas = document.getElementById("hidden");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
      const angle = -20;
      const text = "181250093 柳斯宁";
      ctx.drawImage(img, 0, 0);
      var originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.font = "24px 楷体";
      const hex = "#FF0000";
      ctx.fillStyle = hex;
      ctx.globalAlpha = 0.6;
      ctx.textAlign = "right";
      ctx.rotate((Math.PI / 180) * angle);
      ctx.fillText(text, canvas.width - 300, canvas.height - 100);
      var newData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      mergeData(ctx, originalData, newData, "R");
      processData(ctx, originalData);
    };
    img.src = "../photo/timg.png";
  }

  function processData(ctx, originalData) {
    for (var i = 0; i < originalData.data.length; i++) {
      if (i % 4 == 0) {
        // R分量
        if (originalData.data[i] % 2 == 0) {
          originalData.data[i] = 255;
        } else {
          originalData.data[i] = 0;
        }
      } else if (i % 4 == 3) {
        continue;
      } else {
        originalData.data[i] = 0;
      }
    }
    ctx.putImageData(originalData, 0, 0);
  }

  function mergeData(ctx, originalData, newData, color) {
    var bit;
    switch (color) {
      case "R":
        bit = 0;
        break;
      case "G":
        bit = 1;
        break;
      case "B":
        bit = 2;
        break;
    }
    for (var i = 0; i < originalData.data.length; i++) {
      if (i % 4 == bit) {
        if (newData[i] !== originalData.data[i]) {
          if (originalData.data[i] % 2 != 0) {
            if (originalData.data[i] == 255) {
              originalData.data[i]--;
            } else originalData.data[i]++;
          }
        } else {
          if (originalData.data[i] % 2 == 0) originalData.data[i]++;
        }
      }
    }
    ctx.putImageData(originalData, 0, 0);
  }

  window.__canvas_clear_water_mark = __canvas_clear_water_mark;
  window.__canvas_hiden_water_mark = __canvas_hiden_water_mark;
})();

// 调用
__canvas_clear_water_mark({});
__canvas_hiden_water_mark({});
