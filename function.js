// js常用方法
/* 1. 截取链接对象
*@param url String
* */
function sliceQueryParams(url) {
    url = url == null ? window.location.href : url
    var search =url.substring(url.lastIndexOf('?'));
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, (rs,$1,$2) => {
        var name = decodeURIComponent($1);
        var val = decodeURIComponent($2);
        val = String(val)
        obj[name] = val;
        return rs;
    })
    return obj
}
/* 2. 监听dom对象属性变换
 childList：子元素的变动
 attributes：属性的变动
 characterData：节点内容或节点文本的变动
 subtree：所有下属节点（包括子节点和子节点的子节点）的变动
 attributeFilter: 监听制定属性[attrName]
* */
function observerAttr() {
    var target = document.querySelector('.box')
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;//浏览器兼容
    var observer = new MutationObserver(function (mutations) {
        debugger
        mutations.forEach((mutation) => {
            console.log(mutation)
        })
    })
    var config = {
        attributes: true,
        childList: true,
        characterData: true
    }
    observer.observe(target,config)
    // Later, you can stop observing
    // observer.disconnect();
}
/**
 *3.防抖函数
 *@param fn 事件触发的操作
 *@param delay 多少毫秒内连续触发事件，不会执行
 *@returns {Function}
 * input.addEventListener('input',debounce(aa,1000))
 */
function debounce(fn,delay){
    let timer = null;
    return function(){
        debugger
        let self = this,
            args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(function(){
            fn.apply(self,args);
        },delay);
    }
}
/*4.递归深拷贝
*@param source Object
* */
function deepCopy( source ) {
    if (!isObject(source)) return source; //如果不是对象的话直接返回
    let target = Array.isArray( source ) ? [] : {} //数组兼容
    for ( var k in source ) {
        if (source.hasOwnProperty(k)) {
            if ( typeof source[ k ] === 'object' ) {
                target[ k ] = deepCopy( source[ k ] )
            } else {
                target[ k ] = source[ k ]
            }
        }
    }
    return target
}

function isObject(obj) {
    return typeof obj === 'object' && obj !== null
}

/* Cookie*/
function setCookie (name,value,day) {
    var d = new Date();
    d.setTime(d.getTime() + (day*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
} 
function  removeCookie(name) {
    setCookie(name, "", -1);
}
/*5格式化日期*/
/*
 * 格式化日期
 * @param dt 日期对象
 * @returns {string} 返回值是格式化的字符串日期
 * 2020年03月13日 23:02:03
 * Fri Mar 13 2020 23:03:16 GMT+0800 (中国标准时间)
 */
function getDates (dt) {
    var str = ""; //存储时间的字符串
    //获取年
    var year = dt.getFullYear();
    //获取月
    var month = dt.getMonth() + 1;
    //获取日
    var day = dt.getDate();
    //获取小时
    var hour = dt.getHours();
    //获取分钟
    var min = dt.getMinutes();
    //获取秒
    var sec = dt.getSeconds();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    str = year + "年" + month + "月" + day + "日 " + hour + ":" + min + ":" + sec;
    return str;
}

/*6.根据id获取dom对象*/
function getDom(id) {
    return document.getElementById(id);
}
/* 7.设置元素的文本内容
 * @param element 任意元素
 * @param text 任意文本内容
 */
function setInnerText (element, text) {
    if (typeof(element.textContent) == "undefined") {
        element.innerText = text;
    } else {
        element.textContent = text;
    }
}
/**
 * 8.获取元素的文本内容
 * @param element 任意元素
 * @returns {*} 任意元素中的文本内容
 */
function getInnerText(element) {
    if (typeof(element.textContent) == "undefined") {
        return element.innerText;
    } else {
        return element.textContent;
    }
}
/**
 * 9.获取父级元素中的第一个子元素
 * @param element 父级元素
 * @returns {*} 父级元素中的子级元素
 */
function getFirstElement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var node = element.firstChild;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
/**
 *  10.获取父级元素中的最后一个子元素
 * @param element 父级元素
 * @returns {*} 最后一个子元素
 */
function getLastElement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.lastChild;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}

/**
 * 11.获取某个元素的前一个兄弟元素
 * @param element 某个元素
 * @returns {*} 前一个兄弟元素
 */
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling
    } else {
        var node = element.previousSibling;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}
/**
 * 12.获取某个元素的后一个兄弟元素
 * @param element 某个元素
 * @returns {*} 后一个兄弟元素
 */
function getNextElement (element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling
    } else {
        var node = element.nextSibling;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
/**
 * 13.获取某个元素的所有兄弟元素
 * @param element 某个元素
 * @returns {Array} 兄弟元素
 */
function getSiblings(element) {
    if (!element) return;
    var elements = [];
    var ele = element.previousSibling;
    while (ele) {
        if (ele.nodeType === 1) {
            elements.push(ele);
        }
        ele = ele.previousSibling;
    }
    ele = element.nextSibling;
    while (ele) {
        if (ele.nodeType === 1) {
            elements.push(ele);

        }
        ele = ele.nextSibling;
    }
    return elements;
}

/**
 * 14.返回当前浏览器是什么类型的浏览器
 */
function userBrowser() {
    var browserName = navigator.userAgent.toLowerCase();
    if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
        console.log("IE");
    } else if (/firefox/i.test(browserName)) {
        console.log("Firefox");
    } else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
        console.log("Chrome");
    } else if (/opera/i.test(browserName)) {
        console.log("Opera");
    } else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {
        console.log("Safari");
    } else {
        console.log("不知道什么鬼!");
    }
}
/*15.去除空格
 * @param str Sring
 * @param type Number
*/
//  type 1-所有空格  2-前后空格  3-前空格 4-后空格
function trim(str, type) {
    switch (type) {
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}

/*16检测字符串（校验）
*checkType('165226226326','phone')
* false
*/
function checkType(str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
            return /^[0-9]$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        default:
            return true;
    }
}
/*17.检测密码强度
*checkPwd('12asdASAD')
* 3(强度等级为3)
* */
function checkPwd(str) {
    var nowLv = 0;
    if (str.length < 6) {
        return nowLv
    };
    if (/[0-9]/.test(str)) {
        nowLv++
    };
    if (/[a-z]/.test(str)) {
        nowLv++
    };
    if (/[A-Z]/.test(str)) {
        nowLv++
    };
    if (/[\.|-|_]/.test(str)) {
        nowLv++
    };
    return nowLv;
}

/*18.随机码
 count取值范围0-36
 randomNumber(10)
 "2584316588472575"
 randomNumber(14)
 "9b405070dd00122640c192caab84537"
 Math.random().toString(36).substring(2);
 "83vhdx10rmjkyb9"
*/

function randomNumber (count){
    return Math.random().toString(count).substring(2);
}

/*19.查找字符串出现次数
* @param str String
* @param strSplit String
* countStr(strTest,'blog')
* */
function countStr(str, strSplit) {
    return str.split(strSplit).length - 1
}

/*20.数组去重
 ES6新增的Set数据结构，类似于数组，但是里面的元素都是唯一的 ，其构造函数可以接受一个数组作为参数
 let arr=[1,2,1,2,6,3,5,69,66,7,2,1,4,3,6,8,9663,8]
 let set = new Set(array);
 {1,2,6,3,5,69,66,7,4,8,9663}
 ES6中Array新增了一个静态方法from，可以把类似数组的对象转换为数组
 Array.from(set)
 [1,2,6,3,5,69,66,7,4,8,9663]
 * */
function removeRepeatArray(arr) {
    return Array.from(new Set(arr))
}

/*21.数组顺序打乱*/
function upsetArr (arr) {
    return arr.sort(function() {
        return Math.random() - 0.5
    });
}

/*22.数组最大值最小值*/
//这一块的封装，主要是针对数字类型的数组
function maxArr(arr) {
    return Math.max.apply(null, arr);
}
function minArr(arr) {
    return Math.min.apply(null, arr);
}

/*23.数组求和，平均值*/
//这一块的封装，主要是针对数字类型的数组
//求和
function sumArr(arr) {
    var sumText = 0;
    for (var i = 0, len = arr.length; i < len; i++) {
        sumText += arr[i];
    }
    return sumText;
}
/*
* 24.平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活了！
* */
function covArr(arr) {
    var sumText = sumArr(arr);
    var covText = sumText / arr.length;
    return covText;
}

/*25.
* @param arr Array
* @param rank Number 返回排序的长度
* @param ranktype Number 为1为升序
* */
function getCount(arr, rank,ranktype) {
    var obj = {};
    var k, arr1 = [];
    //记录每一元素出现的次数
    for (var i = 0, len = arr.length; i < len; i++) {
        k = arr[i];
        if (obj[k]) {
            obj[k]++;
        } else {
            obj[k] = 1;
        }
    }
    //保存结果{el-'元素'，count-出现次数}
    for (var o in obj) {
        arr1.push({
            el: o,
            count: obj[o]
        });
    }
    //排序（降序）
    arr1.sort(function(n1, n2) {
        return n2.count - n1.count
    });
    //如果ranktype为1，则为升序，反转数组
    if (ranktype === 1) {
        arr1 = arr1.reverse();
    }
    var rank1 = rank || arr1.length;
    return arr1.slice(0, rank1);
}
/*26.筛选数组(删除值为'val'的数组元素)
*@param arr Array
* @param val String 匹配字符串
* @param type String %带val即匹配，不带要完全匹配
* */
function removeArrayForValue(arr, val, type) {
    arr.filter(function(item) {
        return type === '%' ? item.indexOf(val) !== -1 : item !== val
    })
}
/*27.现金转换
* @param n Number
* */
function upDigit(n) {
    var fraction = ['角', '分', '厘'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠人民币' : '人民币';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        //s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')+ unit[0][i] + s;
        s = p + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}
/*28.随机返回一个范围内的数字*/
function randomNumber(n1, n2) {
    //randomNumber(5,10)
    //返回5-10的随机整数，包括5，10
    if (arguments.length === 2) {
        return Math.round(n1 + Math.random() * (n2 - n1));
    }
    //randomNumber(10)
    //返回0-10的随机整数，包括0，10
    else if (arguments.length === 1) {
        return Math.round(Math.random() * n1)
    }
    //randomNumber()
    //返回0-255的随机整数，包括0，255
    else {
        return Math.round(Math.random() * 255)
    }
}
/*29.获取url中的参数
* @param param String 获取的key
* */
function getUrlParam(url,param) {
    url = url == null? window.location.href : url
    var search = url.substring(url.lastIndexOf('?'))
    var urlParams = new URLSearchParams(search);
    return urlParams.get(param)
}
