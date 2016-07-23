(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.verificationCodeCountdown = root.VCCD = factory();
    }
})(window, function () {
    //初始化参数
    var defaults = {
        start: 59,  //开始数字
        end: 0,     //结束数字
        disabledCls: 'disabled',    //倒计时中的class
        inText: '重发({i}秒)',   //倒计时进行中显示文字
        callback: function () {
        }      //点击dom后的回调函数
        //text: '获取验证码'       //倒计时完成正常显示的验证码，默认为初始化之前的文字
    };
    /**
     * 替换属性
     * @param target 目标对象
     * @param source 源对象
     */
    var extend = function (target, source) {
        for (var i in source) {
            target[i] = source[i];
        }
        return target;
    };

    /**
     * 添加事件
     * @param dom
     * @param type
     * @param fn
     */
    var addEvent = function (dom, type, fn) {
        if (dom.addEventListener) {
            dom.addEventListener(type, fn, false);
        } else if (dom.attachEvent) {
            dom.attachEvent(type, fn);
        } else {
            dom['on' + type] = fn;
        }
    };

    var removeEvent = function (dom, type, fn) {
        if (dom.removeEventListener) {
            dom.removeEventListener(type, fn, false);
        } else if (dom.detachEvent) {
            dom.detachEvent(type, fn);
        } else {
            dom['on' + type] = null;
        }
    };


    /**
     * @return 返回一个新的对象
     * @param _config 配置参数
     */
    return function (_config) {
        var config = extend(defaults, _config);
        var num = 0; //验证码获取次数
        /**
         * 点击dom
         */
        var startClick = function (e) {
            var that = config.dom, clsName = that.className;
            //根据类名判断是否在倒计时，如果不在，则开始倒计时
            if (clsName.indexOf(config.disabledCls) < 0) {
                config.callback(e, that);
                that.className += ' ' + config.disabledCls;
            }
        };
        /**
         * 开始倒计时
         */
        var start = function () {
            var curr = config.start, end = config.end, dom = config.dom, inText = config.inText;
            num++;  //验证码获取次数加一
            if (dom.className.indexOf(config.disabledCls) < 0) {
                dom.className += ' ' + config.disabledCls;
            }
            dom.innerHTML = inText.replace('{i}', curr);
            setTimeout(function loop() {
                curr--;
                if (curr > end) {   //如果当前数字大于结束数字，继续倒计时
                    dom.innerHTML = inText.replace('{i}', curr);
                    setTimeout(loop, 1000);
                } else {    //如果当前数字小于等于结束数字，倒计时完成
                    //删除样式
                    dom.className = dom.className.replace(config.disabledCls, '');
                    dom.innerHTML = config.text;
                }
            }, 1000);
        };

        /**
         * 初始化
         */
        var init = function () {
            var dom = config.dom;
            //如果没有设置倒计时完成后显示的文字，则为初始化之前的文字
            if (typeof config.text === 'undefined') {
                config.text = dom.innerHTML;
            }
            addEvent(dom, 'click', startClick);
        };

        /**
         * 清除
         */
        var destroy = function () {
            //删除点击事件
            removeEvent(config.dom, 'click', startClick);
            config = startClick = start = init = null;
        };
        //初始化
        init();
        return {
            destroy: destroy,
            start: start,
            getNum: function () {
                return num;
            }
        };
    };
});

