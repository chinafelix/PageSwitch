# PageSwitch
A full-screen jQuery travelling plugin
# 配置参数如下：
``` 		
    selectors :{
      nodes: ".nodes" ,				//所有子页面的容器的class
      node : ".node" ,				//每子页面的class
      pagination:".pagination-box",	//分页按钮的容器的class
      active: ".active",				//分页按钮选中状态
    },
    index: 0,							//默认显示第几个子页
    pagination: true,					//是否生成分页按钮 true：是   false：否
    loop: true,							//是否循环滑动 true：是   false：否
    keyboard:true,						//是否支持键盘（上、左上滑，下、右下滑）true：是   false：否
    direction: "vertical",				//"vertical":竖向排列，"horizontal"：横向排列
    duration: 500,						//页面滑动动画时长，单位ms
    ease: 'ease',						//页面滑动动画效果
    callback: ''						//动画完成后的回调函数
 ```
 # 调用
 ``` 
    $(selector).pageSwitch();
    
    PS: selector 是包含配置参数中selectors.nodes的元素 。
 ```
 # 使用方法：
 
 默认生成分页按钮，点击分页按钮或者滚动鼠标滚轮，实现页面滑动切换；如果设置不支持分页，则滚动鼠标滚轮控制页面滑动；
 如果设置支持键盘控制，则可以使用键盘上的四个方向键控制页面滑动，默认支持键盘控制。


## 点击下面链接，运行项目：
 https://chinafelix.github.io/PageSwitch/
