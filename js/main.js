var num = 1;
var start = 0;
var flag = false;
$(function () {
  var hash = document.getElementById("hash");
  $(hash).bind('keydown',function(event){
    if(event.keyCode == "13")    
    {
      console.log(hash.value)
      console.log(hex_sha256(hash.value));
    }
  });
  
  $(window).bind("scroll", function () {
    show();
   
  });

  function show() {
    console.log($(document).height());
    console.log( $(window).scrollTop() );
    console.log( $(window).height() );
    
    if (
      $(window).scrollTop() + $(window).height()+1 >= $(document).height() &&
      !flag
    ) {
      ajaxRead();
    }
  }

  function ajaxRead() {
    $.ajax({
      type: "get",
      url: "tableData.json",
      success: function (res) {
        console.log(res);
        var str = "";

        for (var i = start; i < start + num; i++) {
          // str += "<img src=" + res[i].img+">" ;
          console.log(i);
          str += '<h1 style="margin-left:10%;">' + res[i].title + "</h1>";
          str +=
            '<div id="img' +
            i +
            '" style="height: 330px;margin-left:20vh; background: transparent scroll url(' +
            res[i].img +
            ') no-repeat -200px -0px;border-bottom:1px solid #000;"></div></br>';
          str +=
            "<script>for(let i=" +
            i +
            ";i<" +
            (start + num) +
            ';i++){var image = document.getElementById("img"+i);image.onclick=function(){document.location.assign("../sub.html"+"?"+i);}}</script>';

          console.log(res.length + "length");
        }
        start++;
        flag = res.length - start > 0 ? false : true;
        $(".picTable").append(str);
      },
      error: function () {
        console.log(errors);
      },
    });
  }
});
