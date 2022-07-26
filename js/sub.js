
$.ajax({
  url: "tableData.json",
  type: "get",
  success: function(res){
    var page;
    var thisURL=document.URL;
    var getval=thisURL.split('?');
    if(getval.length>1){
    page=getval[1];
    } 
    console.log(page);
      var str = "";
      size=res[page].imgs.length
      console.log(size );
      for(var i = 0;i < size;i++){
          // str += "<img src=" + res[i].img+">" ;
          str+="<img class= \"lazy\" data-original=\""+res[page].imgs[i]+"\" style=\"width:100%\"></img>";
    
      }
      $("#picture").append(str);
      $("img.lazy").lazyload({effect: "fadeIn"});
  },
  error:function(){
      console.log(errors);
  }
})
