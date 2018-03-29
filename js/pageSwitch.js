(function($){

	var PageSwitch = (function(){
		function Switch(element,options){
			this.element = element ;
			this.settings = $.extend(true,$.fn.pageSwitch.defaluts , options || {});
			this.init();
		}

		Switch.prototype = {
			init: function(){
				var me = this;
				// console.log(me);
				me.selectors = me.settings.selectors;
				me.nodes = me.element.find(me.selectors.nodes);
				me.node = me.nodes.find(me.selectors.node);

				me.pageCount = me.pageCount();
				me.index = (me.settings.index >0 && me.settings.index < me.pageCount) ? me.settings.index : 0;
				me.direction = me.settings.direction == "vertical" ? true : false ;
				me.canScroll = true;

				if(me.settings.pagination){
					this.pagination();
				}

				if(!me.direction || me.index){
					this._initLayout();
				}

				this.event();

			},
			pageCount: function(){
				return this.node.length;
			},
			prev: function(){
				var me = this;
				if(me.index){
					me.index -- ;
				}else if(me.settings.loop){
					me.index = me.pageCount-1 ;
				}
				me._pageScroll();
			},
			next: function(){
				var me = this;
				if(me.index < me.pageCount-1){
					me.index ++ 
				}else if(me.settings.loop){
					me.index = 0 ;
				}
				me._pageScroll();
			},
			pagination: function(){
				var me = this ,
					paginationClass = me.selectors.pagination.substring(1),
					clickNode = "<ul class='"+paginationClass+"'>";
				me.activeClass = me.selectors.active.substring(1);

				for(var i=0;i<me.pageCount;i++){
					clickNode +="<li></li>"
				}
				clickNode += "</ul>";
				me.element.append(clickNode);
				
				var pageNode = me.element.find(me.selectors.pagination);
				me.paginationItem = pageNode.find('li');
				me.paginationItem.eq(me.index).addClass(me.activeClass);

				if(me.direction){
					pageNode.addClass('vertical');
				}else{
					pageNode.addClass('horizontal')
				}
			},
			event: function(){
				var me = this;
				me.element.on('click',me.selectors.nodes+' li',  function(e) {
					me.index = $(this).index();
					me._pageScroll();
				});

				$(window).on('mousewheel DOMMouseScroll', function(e) {
					var wheelCode = e.originalEvent.wheelDelta || -e.originalEvent.detail ;
					if(me.canScroll){
						if(wheelCode> 0 && (me.index && !me.settings.loop || me.settings.loop)){
							me.prev();
						}else if(wheelCode<0 &&(me.index<(me.pageCount-1) && !me.settings.loop || me.settings.loop)){
							me.next();
						}
					}
				});

				if(me.settings.keyboard){
					$(window).on('keydown', function(e) {
						// console.log(e)
						var keyCode = e.keyCode;
						if(keyCode == 37 || keyCode ==38){
							me.prev();
						}else if(keyCode == 39 || keyCode == 40){
							me.next();
						}
					});
				}
			},
			_pageScroll: function(init){
				var me = this,
					offset = me.node.eq(me.index).position() ,
					offsetCss = me.direction ? {top:-offset.top} : {left:-offset.left} ;
				me.canScroll = false;
				me.nodes.animate(offsetCss,me.settings.duration ,function(){
					me.canScroll = true;
					if(me.settings.callback && $.type(me.settings.callback)=="function"){
						me.settings.callback(me);
					}
				}) ;
				if(!init && me.settings.pagination){
					me.paginationItem.eq(me.index).addClass(me.activeClass).siblings('li').removeClass(me.activeClass);
				}
			},
			_initLayout: function(){
				var me = this;
				if(!me.direction){
					var nodesWidth = (me.pageCount *100)+'%' ,
						nodeWidth = (100/me.pageCount)+'%';
					me.nodes.width(nodesWidth);
					me.node.width(nodeWidth).css('float','left');
				}
				if(me.index){
					me._pageScroll(true);
				}
			}
		}

		return Switch;

	})()

	$.fn.pageSwitch = function(options){
		return this.each(function(i, el) {
			var me = $(this),
				instance = me.data('PageSwitch');
			if(!instance){
				instance = new PageSwitch(me,options);
				me.data('PageSwitch',instance);
			}
			if($.type(options) == "string") return instance[options]();
		});
	}

	$.fn.pageSwitch.defaluts = {
		selectors :{
			nodes: ".nodes" ,
			node : ".node" ,
			pagination:".pagination-box",
			active: ".active",
		},
		index: 0,
		pagination: true,
		loop: true,
		keyboard:true,
		direction: "vertical",
		duration: 500,
		ease: 'ease',
		callback: ''
	}

})(jQuery)