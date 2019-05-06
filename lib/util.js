let util = {};
// 格式化时间
util.formatDate = function (date, space = '-') {
    return `${this.formatNumber(date.getFullYear())}${space}${this.formatNumber(date.getMonth())+1}${space}${this.formatNumber(date.getDate())}`;
};
util.formatTime = function (date, space1 = '-', space2 = ':') {
    return `${this.formatNumber(date.getFullYear())}${space1}${this.formatNumber(date.getMonth())+1}${space1}${this.formatNumber(date.getDate())} ${this.formatNumber(date.getHours())}${space2}${this.formatNumber(date.getMinutes())}${space2}${this.formatNumber(date.getSeconds())}`;
};
// 格式化数字
util.formatNumber = function (num) {
    return num > 9 ? num : '0' + num;
};
// 整合数字
util.transformValue = function (val) {
    let endVal = 0;
    let unit = '';
    if (val < 10000) {
        endVal = val;
    } else if (val >= 10000 && val < 100000000) {
        endVal = parseInt(val / 10000);
        unit = '万';
    } else {
        endVal = parseInt(val / 100000000);
        unit = '亿';
    }
    return {
        val: endVal,
        unit: unit
    };
};
//自定义判断元素类型
util.toType = function(obj)
{
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};
// 参数过滤函数
util.filter_param = function (o) {
    for(var key in o)
    {
        if(o[key]==null)
            delete o[key];
        if(this.toType(o[key])==="string")
        {
            o[key] = o[key].trim();
            if(o[key].length==0)
            {
                delete o[key];
            }
        }
    }
    return o;
};
// 封装参数
util.initData = function(params) {
    var URLSearchParams = require('url-search-params');
    // 360浏览器不支持URLSearchParams
    if (typeof URLSearchParams === "function") {
        var formMap = new URLSearchParams();
        for (var key in params) {
            formMap.append(key, params[key]);
        }
        return formMap;
    }
    else {
        return params;
    }

};

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

util.handleTitle = function (vm, item) {
    if (typeof item.title === 'object') {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
};

export default util;
