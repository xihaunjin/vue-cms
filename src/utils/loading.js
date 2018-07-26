'use strict'
/**
 * @Desc: loding组件
 * @Author: 左左
 * @Date: 2016-06-07
 */

/**
 * @Title: loading 管理器
 * @Desc: 提供loading动画的加载和移除,可配置loading动画的加载位置,多异步在同一位置加载loading时,提供逻辑控制.
 * @Author: chonglou
 * @return: @type{{instance}}
 *      instance 函数参数需要
 *         @Param parentCmp loading 对象加载的dom(原生dom), 如果为空则为document.body
 *         @Param iconStyle loading 动画的样式常量值,如果为空为全局的 global loading效果
 *         @Param message loading 动画里显示的文字.
 *         @return @type
 *             返回的对象有put,pop两个方法,put方法是加载loading动画,pop方法弹出loading动画
 *  .e.g
 *      LoadingManager.instance().put();
 *      setTimeout(function(){
 *      	LoadingManager.instance().pop();
 *      },10000);
 */

const LoadingManager = (function() {
	//定义loading icon style
	let GLOBAL = "global"; //默认全局loading
	let ICON_STYLE = {};
	ICON_STYLE[GLOBAL] = [
		'<section class="loading-box">',
		'     <div class="loading-global"></div>',
		'</section>'
	].join(' ');

	//存放loading对象
	let loadings = [];
	return {
		instance: function(iconStyle) {
			let parentCmp = document.body;
			iconStyle = iconStyle || GLOBAL;

			let loading = loadings.filter(function(l) {
				return l.parentCmp === parentCmp;
			})[0];

			if(!loading) {
				loading = {
					parentCmp: parentCmp,
					stack: 0
				}
				loadings.push(loading);
			};
			return {
				//压入一个loading
				put: function() {
					if(!loading.stack) {
						let loadingModule = parentCmp.querySelector('.loading-module');
						if(!loadingModule) {
							//创建loading模块
							let loadingModule = document.createElement("section");
							let moduleClass = document.createAttribute("class");
							moduleClass.nodeValue = "loading-module";
							loadingModule.setAttributeNode(moduleClass);
							loadingModule.innerHTML = ICON_STYLE[iconStyle];
							//添加到父级Dom中去
							parentCmp.appendChild(loadingModule);
						}
					}
					loading.stack++;
				},
				//弹出一个loading
				pop: function() {
					loading.stack--;
					if(!loading.stack) {
						//移除父dom的子loading模块
						parentCmp.querySelector('.loading-module').remove();
					}
				}
			}
		}
	}
})();

module.exports = {
	put: function(config = {}) {
		LoadingManager.instance(config.loadingIconStyle).put();
	},
	pop: function(config = {}) {
		LoadingManager.instance(config.loadingIconStyle).pop();
	}
}