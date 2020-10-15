let htmlArea = document.querySelector("#htmlArea");
// html中多个空格会被展示一个空格
// 在pc mobile上分别控制一下八卦的大小
let circleSize = [400,200]
if(document.body.clientWidth<=500){
    circleSize=circleSize.map((item)=>item/2)
}
circleSize=circleSize.map((item)=>item+'px')
let string = `
/* 你好，我叫Ryan
接下来我演示一下我的前端功底
我正在画一个八卦
我写到哪一句，CSS就立马会生效
首先我要准备一个div
*/
#div1{
    border:1px solid red;
    width:${circleSize[0]};
    height:${circleSize[0]};
}
/* 接下来我把 div 变成一个八卦图
注意看好了
首先，把 div 变成一个圆
*/
#div1{
    border-radius: 50%;
    box-shadow: 0 0 30px rgba(0,0,0,0.5);
    border: none;
}
/* 八卦是阴阳形成的一黑一白*/
/* from https://cssgradient.io*/
#div1{
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%);
}
/* 用伪元素加两个神秘的小球 */
#div1::before{
    width: ${circleSize[1]};
    height: ${circleSize[1]};
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    background: rgb(255,255,255);
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 14%, rgba(0,0,0,1) 14%, rgba(0,0,0,1) 100%);
}
#div1::after{
    width: ${circleSize[1]};
    height: ${circleSize[1]};
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    background: rgb(0,0,0);
    background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 14%, rgba(255,255,255,1) 14%, rgba(255,255,255,1) 100%);
}
`;
let fast = 100;
let str = "";
let styleStr = "";
// string=string.replace(/\n/g,'<br>');
// replace只会replace第一个
// 所以需要动用正则
// 如何确保string中哪些是\n?
// string.charCodeAt
// innerHTML会把字符串里的html标签解析出来

function fn(n) {
  if (n === 0) {
    return;
  } else {
    setTimeout(() => {
      string.length-n>=50&&(fast=50)
      string.length-n>=200&&(fast=10)
      if (string[string.length - n].charCodeAt() === 10) {
        str = str + "<br>";
      } else if (string[string.length - n].charCodeAt() === 32) {
        str = str + "&nbsp;";
      } else {
        str = str + string[string.length - n];
      }
      styleStr = styleStr + string[string.length - n];
      htmlArea.innerHTML = str;
      style.innerHTML = styleStr;
      htmlArea.scrollTo(0, 99999);
      window.scrollTo(0, 99999);
      console.log(str);
      fn(n - 1);
    }, fast);
  }
}
fn(string.length);
