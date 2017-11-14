
/*var elevator={
  fHeight:0,
  up:0,
  down:0,
  init:function(){
    this.fHeight=
      parseFloat($('#d1').css('height'))+
      parseFloat($('#d1').css('marginTop'));
    this.up=(innerHeight-this.fHeight)/2;
    this.down=this.up+this.fHeight;
    $(document).scroll(function(){
      $(".items>h3").each(function(i,elem){
        var h3=$(elem);
        var offsetTop=h3.offset().top;
        var scrollTop=$('body').scrollTop();
        var aa=this.up;
        if(offsetTop<this.down+scrollTop && offsetTop>this.up+scrollTop){
          h3.addClass('light');
          $("#elevator>ul>li:eq("+i+")>a:first")
            .css("display","none")
            .next().css("display","block");
        }else{
          h3.removeClass('light');

          $("#elevator>ul>li:eq("+i+")>a:first")
            .css("display","block")
            .next().css("display","none");
        }
      }.bind(this));
    }.bind(this))
  }
};
elevator.init();*/

var winW,winH;
if (window.innerHeight) { // all except IE
  winW = window.innerWidth;
  winH = window.innerHeight;
} else if (document.documentElement
  && document.documentElement.clientHeight) {
  // IE 6 Strict Mode
  winW = document.documentElement.clientWidth;
  winH = document.documentElement.clientHeight;
} else if (document.body) { // other
  winW = document.body.clientWidth;
  winH = document.body.clientHeight;
}
function InitHeight(){
  var t = 0;
  var e = document.getElementById("first");
  while(e = e.offsetParent)t+= e.offsetTop;
  return t;
}

//var Items = document.getElementsByClassName('items');

var link={};
var d=0;
var mark='';/*当前是第几个div*/
var divScrollTop=[];
var screenH=innerHeight;
var changeScrollTop = $('body').scrollTop() + InitHeight()+winH*(1/3);

function current(){
  var bace=screenH*(2/3)+$('body').scrollTop();
  var Items = $('.items');
  divScrollTop=[];
  for(var i = 0,len = Items.length;i<len;i++){
    var div=$(Items[i]).attr('id');
    link[div]={
      self:Items[i]
    };
    if(i==0){
      link[div].next=Items[i+1]
    }else if(i==len-1){
      link[div].prev=Items[i-1]
    }else{
      link[div].next=Items[i+1];
      link[div].prev=Items[i-1];
    }
    divScrollTop.push(Items[i].offsetTop);
  }

  /*for(var j=0;j<divScrollTop.length;j++){
    if(changeScrollTop>divScrollTop[j] && changeScrollTop<divScrollTop[j+1]){
      mark='d'+(j+1); console.log('找当前1是：'+mark)
    }
  }*/
  for(var k in link){
    var selfTop=link[k].self.offsetTop;
    var selfH=link[k].self.offsetHeight;
    if(selfTop<bace && (selfTop+selfH)>bace){
      mark=k; console.log('找当前1是：'+mark)
    }
  }
  //if(mark==''){mark='d1';}
  console.log('找当前2是：'+mark)
  $(link[mark].self).addClass('border').siblings().removeClass('border');
}

function upDown(){
  var scrollTop = $(document).scrollTop();//document.body.scrollTop
  var baceLine=screenH*(2/3)+scrollTop;
  var Num=parseInt(mark.slice(1));
  var next='d'+(Num+1);
  var prev='d'+(Num-1);
  if(d<scrollTop){//下滚，页面向上滚,下一个
    console.log()
    console.log(9999999999999)
    /*当前自己 */
    if($(link[mark].self).find('.read').html()=='收起'){
      if(link[mark].self.offsetHeight+link[mark].self.offsetTop<scrollTop+winH){
        $(link[mark].self).find('.read').parent().css({'position':'absolute'})
      }
    }

    if(link[next]){
      if($(link[next].self).find('.read').html()=='收起'){
        if(winH/3+link[next].self.offsetTop<scrollTop+winH){
          $(link[next].self).find('.read').parent().css({'position':'fixed'})
        }
      }
    }

    /*找下一个mark  next*/
    if(link[next]){//排除不存在下一个
      if(baceLine>link[mark].self.offsetTop+link[mark].self.offsetHeight && baceLine>link[next].self.offsetTop){
        $(link[mark].self).removeClass('border');$(link[next].self).addClass('border');
        mark=next;
      }
    }
  }else{//上滚，页面向下滚，上一个
    console.log(66666666666666)
    if($(link[mark].self).find('.read').html()=='收起'){
      if(link[mark].self.offsetHeight+link[mark].self.offsetTop>scrollTop+winH){
        $(link[mark].self).find('.read').parent().css({'position':'fixed'})
      }
    }

    if(link[next]){
      if($(link[next].self).find('.read').html()=='收起'){
        if(winH/3+link[next].self.offsetTop>scrollTop+winH){
          $(link[next].self).find('.read').parent().css({'position':'absolute'})
        }
      }
    }

    if(link[prev]){//排除不存在上一个
      if(baceLine<link[mark].self.offsetTop && baceLine<link[prev].self.offsetTop+link[prev].self.offsetHeight){
        $(link[mark].self).removeClass('border');$(link[prev].self).addClass('border');
        mark=prev;
      }
    }
  }
  setTimeout(function(){d=scrollTop;},0);
}

current();
$(window).scroll(upDown);