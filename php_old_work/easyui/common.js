//获取参数
function getParameter(val) {
    var uri = window.location.search;
    var re = new RegExp("" + val + "=([^&?]*)", "ig");
    return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
}

//限制只能输入数字
function onlyNum() {
    if (!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 37) && !(event.keyCode == 39))
        if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)))
            event.returnValue = false;
}


/*在指定的Tabs控件中添加tab页*/
/*tabsName:tabs控件的id;
tabtitle:新增tab页的名称；
url:新增tab页的内容来源页面*/
function addTab(tabsName, tabtitle, url) {

    if ($('#' + tabsName).tabs('exists', tabtitle)) {
        $('#' + tabsName).tabs('select', tabtitle)
    }
    else {
        var content = '<iframe scroll="auto" frameborder="0" src="' + url + '" style="width:100%; height:100%;" ></iframe>';
        $('#' + tabsName).tabs('add', {
            title: tabtitle,
            content: content,
            selected: true,
            closable: true
        });
    }
}

function closeTab(tabsName, tabtitle) {
    if ($('#' + tabsName).tabs('exists', tabtitle)) {
        $('#' + tabsName).tabs('close', tabtitle)
    }
}

function childAddTab(tabsName, tabtitle, url) {
    window.parent.addTab(tabsName, tabtitle, url);
}

function childCloseTab(tabsName, tabtitle) {
    window.parent.closeTab(tabsName, tabtitle);
}


/*删除行*/
function DeleteRow(gridid, index) {
    $('#' + gridid).datagrid('deleteRow', index);
}


var JsonDate = {
    //EasyUI用DataGrid用日期格式化
    DateFormatter: function (value, rec, index) {
        if (value == undefined) {
            return "";
        }
        /*json格式时间转js时间格式*/
        //var date = new Date(value);
        return value.substring(0, 10);
    },
    DateTimeFormatter: function (value, rec, index) {
        if (value == undefined) { return ""; }
        /*json格式时间转js时间格式*/
        //var date = new Date(value);
        return value.substring(0, 10) + " " + value.substr(11, 5);
    }
};
var JsDate = [{
    //EasyUI用DataGrid用日期格式化
    DateFormatter: function (date) {
        if (date == undefined) {
            return "";
        }
        /*json格式时间转js时间格式*/
        //var date = new Date(value);
        return date.getFullYear + "-" + (date.getMonth + 1) + "-" + date.getDate();
    },
    DateTimeFormatter: function (date) {
        if (date == undefined) {
            return "";
        }
        /*json格式时间转js时间格式*/
        //var date = new Date(value);
        return date.getFullYear + "-" + (date.getMonth + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
    }
}];

/*
功能:根据分页控件中的页面大小和当前页号自动为指定的DataGrid加载数据
调用:本方法会在jsonurl中添加两个参数：pi代表当前页的页号，ps代表页面大小，
可在异步处理的后台获取这两个数据以后检索出需要的数据。
特征：实现自定义分页，为DataGrid动态载入数据
参数说明:
paginationID:分页控件的ID
datagridID:DataGrid控件的ID
jsonurl:获取分页数据的链接地址，要求返回json
pref:jsonurl的前缀，用户在不同层级目录中调用相同的分页js
*/
function BindPageDataForGrid(paginationID, datagridID, jsonurl, pageSize, pref) {

    if (pref != null) { jsonurl = pref + jsonurl }
    var pagesize = pageSize; //获得页面大小
    var pageindex = 1; //首次加载数据时，页号为1
    $('#' + datagridID).datagrid('loadData', { total: 0, rows: [] }); //清空数据
    //首次加载数据
    if (jsonurl.indexOf("?") != -1)
        jsonurl = jsonurl + "&time=" + (new Date()).getSeconds() + "&pi=" + pageindex + "&ps=" + pagesize
    else
        jsonurl = jsonurl + "?time=" + (new Date()).getSeconds() + "&pi=" + pageindex + "&ps=" + pagesize
    $('#' + datagridID).datagrid({ url: jsonurl });
    //分页控件换页时的事件绑定
    $('#' + paginationID).pagination({ pageSize: pagesize });
    //分页控件换页时的事件绑定
    $('#' + paginationID).pagination({
        "onSelectPage": function () {
            pageindex = $('#' + paginationID).pagination("options").pageNumber; //获得当前页号
            //清除数据
            $('#' + datagridID).datagrid('loadData', { total: 0, rows: [] });
            //加载数据
            $('#' + datagridID).datagrid({ url: jsonurl });
        }
    });

}

/*
功能：获取查询结果的记录总数，然后把该总数绑定到分页控件，以便计算页数
参数说明：
pageinationID:分页控件ID,
totalurl:计算记录总数的链接，要求必须返回一个整数
pref:totalurl的前缀，用户在不同层级目录中调用相同的分页js
*/
function GetTotalForPagination(paginationID, totalurl, pref) {
    if (pref != null) { totalurl = pref + totalurl; }
    if (totalur.indexOf("?") != -1)
        totalurl += "&time=" + (new Date()).getSeconds();
    else
        totalurl += "?time=" + (new Date()).getSeconds();
    $.ajax({
        type: "POST",
        url: totalurl,
        success: function (data) {
            $('#' + paginationID).pagination({ total: data, pageNumber: 1 });
        }
    });

}
/*
功能：将数据绑定到数据表格控件，并按照设置的页数自动分页,表格控件属性设置url加载数据
参数说明：
datagridID:数据表格控件ID,
*/
function BindDateForGrid(datagridID, pagerFlag) {
    var dg = $('#' + datagridID);
    if (pagerFlag != null) {
        dg.datagrid({ loadFilter: pagerFilter })
    }

}

/*
功能：将数据加载到数据表格，并根据设置自动分页
datagridID：表格控件ID
jsonData：Json格式的数据对象
pagerFlag：分页标志，true表示需要带分页，否则不带分页
*/
function LoadDataForGrid(datagridID, jsonData, pagerFlag) {
    if (pagerFlag == true)
        $("#" + datagridID).datagrid({ loadFilter: pagerFilter });
    $("#" + datagridID).datagrid("loadData", { total: jsonData.length, rows: jsonData });
}

/*
功能:为DataGrid控件以分页形式绑定数据
作者：吴柳熙
日期：2014-11-09
datagridID：DataGrid控件ID,
totalurl:统计记录总数的url
dataurl:获取数据的url
pref:url的前缀

*/
function BindDataForGridByPage(datagridID, dataurl, pref) {
    var opts = $('#' + datagridID).datagrid("options");
    var pager = $('#' + datagridID).datagrid("getPager");
    var total = CommitHandle(pref + dataurl + "&getsum=1", "text", false);
    pager.pagination({ total: total, pageNumber: 1 });

    //首次加载数据
    if (total > 0) {

        var rows = CommitHandle(pref + dataurl + "&pi=1&ps=" + opts.pageSize + "&am=" + pager.pagination("options").total, "json", false);
        $('#' + datagridID).datagrid('loadData', { total: total, rows: eval(rows) });

        //分页控件换页时的事件绑定
        // $('#' + paginationID).pagination({ pageSize: pagesize });
        //分页控件换页时的事件绑定
        pager.pagination({
            "onSelectPage": function () {

                //加载数据
                var pagedata = CommitHandle(pref + dataurl + "&pi=" + pager.pagination("options").pageNumber + "&ps=" + opts.pageSize + "&am=" + pager.pagination("options").total, "json", false);
                $('#' + datagridID).datagrid('loadData', { total: total, rows: eval(pagedata) });
            }
        });
    }
}


/*
功能：将数据绑定到数据表格控件，并按照设置的页数自动分页
参数说明：
datagridID:数据表格控件ID,
*/
function BindDateForGridWithUrl(datagridID, jsonurl, pref, pagerFlag) {
    if (pref != null) { jsonurl = pref + jsonurl; }
    if (jsonurl.indexOf("?") != -1)
        jsonurl = jsonurl + "&time=" + (new Date()).getSeconds();
    else
        jsonurl = jsonurl + "?time=" + (new Date()).getSeconds();
    var dg = $('#' + datagridID);
    dg.datagrid({ url: jsonurl });
    if (pagerFlag == true) {
        dg.datagrid({ loadFilter: pagerFilter })
    }

}

/*
功能：将指定ID的表格控件格式化常用样式

*/
function DataGridFormatter(datagridID) {
    var dg = $('#' + datagridID);
    dg.datagrid({
        striped: true,
        remoteSort: false,
        sorter: function (a, b) { return a > b ? 1 : -1; },
        autoRowHeight: false,
        rowStyler: function (index, row) { return 'height:35px; line-height:35px;'; }
    });
}
/*
功能：将指定ID的表格控件格式化常用样式

*/
function DataGridFormatterWithPager(datagridID) {
    var dg = $('#' + datagridID);
    dg.datagrid({
        striped: true,
        remoteSort: false,
        sorter: function (a, b) { return a > b ? 1 : -1; },
        autoRowHeight: false,
        rowStyler: function (index, row) { return 'height:32px; line-height:32px; font-size:14px;'; }
    });
    var pager = dg.datagrid("getPager");
    var opts = dg.datagrid('options');
    pager.pagination({
        showPageList: false,
        beforePageText: '第',
        afterPageText: '共{pages}页',
        displayMsg: '当前:{from}-{to} 共{total}条记录',
        onSelectPage: function (pageNum, pageSize) {
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh', {
                pageNumber: pageNum,
                pageSize: pageSize
            });
        }
    });
}

/*自定义过滤器*/
function pagerFilter(data) {
    if (typeof data.length == 'number' && typeof data.splice == 'function') {    // is array
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        showPageList: false,
        beforePageText: '第',
        afterPageText: '共{pages}页',
        displayMsg: '当前:{from}-{to} 共{total}条记录',
        onSelectPage: function (pageNum, pageSize) {
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh', {
                pageNumber: pageNum,
                pageSize: pageSize
            });
            dg.datagrid('loadData', data);
        }
    });
    if (!data.originalRows) {
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}


//绑定数据到Select控件
function BindDataForSelect(jsonurl, selectid, choice, async) {
    var textfield = $("#" + selectid).attr("datatextfield");
    var valuefield = $("#" + selectid).attr("datavaluefield");
    var as = async == null ? true : async
    if (jsonurl.indexOf("?") != -1)
        jsonurl = jsonurl + "&time=" + (new Date()).getSeconds();
    else
        jsonurl = jsonurl + "?time=" + (new Date()).getSeconds();
    $("#" + selectid).html("");
    $.ajax({
        type: "POST",
        dataType: "json",
        async: as,
        url: jsonurl,
        success: function (json) {
            if (json != null && json.length > 0) {
                var optionstring = "";
                if (choice == "1") {
                    optionstring += "<option value='0'>不限……</option>";
                }
                for (var i = 0; i < json.length; i++) {
                    optionstring += "<option value=\"" + json[i][valuefield] + "\" >" + json[i][textfield] + "</option>";
                }
                $("#" + selectid).html(optionstring);
            }
        }
    });
}

//通用同步或异步提交处理请求
function CommitHandle(jsonurl, datatype, async) {
    var result;
    if (async == null)
        async = true;
    if (jsonurl.indexOf("?") != -1)
        jsonurl = jsonurl + "&time=" + (new Date()).getSeconds();
    else
        jsonurl = jsonurl + "?time=" + (new Date()).getSeconds();
    $.ajax({
        type: "POST",
        dataType: datatype,
        url: jsonurl,
        async: async,
        success: function (msg) {
            result = msg;
        }
    });
    return result;
}

/*
功能：通用同步或异步提交处理请求，带提示滚动条
jsonurl:提交的目标地址
data:携带的json数据,必须为json对象
datatype:返回的数据类型,json,text
async:是否异步，true,false
*/
function CommitHandle2(jsonurl,data,datatype, async) {
    var result;
    if (async == null)
        async = true;
    if (jsonurl.indexOf("?") != -1)
        jsonurl += "&time=" + (new Date()).getSeconds();
    else
        jsonurl += "?time=" + (new Date()).getSeconds();
    $.ajax({
        type: "POST",
        dataType: datatype,
        data:data,
        url: jsonurl,
        async: async,
        success: function (msg) {
            result = msg;
        }
    });
    return result;
}

/*
功能：异步Post任务，用于结果只要简单显示即可,需要jquery,easyui支撑
url:提交的地址
data:携带的数据
resultType:返回的结果数据类型，json，text,如果json,则必须为自定义的类型ApiAccessResult类型
*/
function PostCommandForEasyUI(url, data, resultType) {
    if (data != null) {
        if (resultType == "json")
            $.post(url, data, function (msg) {
                if (msg.Success == true)
                    $.messager.alert("操作提示", msg.ResultMsg, "info");
                else
                    $.messager.alert("操作提示", msg.ResultMsg, "error");
            }, "json");
        else if (resultType == "text")
            $.post(url, data, function (msg) {
            $.messager.alert("操作提示", msg, "info");
            }, "text");
    }
    else {
        if (resultType == "json")
            $.post(url, function (msg) {
                if (msg.Success == true)
                    $.messager.alert("操作提示", msg.ResultMsg, "info");
                else
                    $.messager.alert("操作提示", msg.ResultMsg, "error");
            }, "json");
        else if (resultType == "text") 
            $.post(url, function (msg) {
            $.messager.alert("操作提示", msg, "info");
            }, "text");
    }
}

/*
功能：生成日期管理的随机码
prefix:前缀
datetype:日期格式, 1 精确到年月日，2精确到时分秒
randomflag:是否需要加随机码
length：随机码位数
*/
function GenerateID(prefix, datetype, randomflag, length) {
    var s = "";
    if (prefix != null && prefix != "") {
        s = prefix + "-";
    }
    var d = new Date();
    var year = d.getFullYear().toString();
    var month = (d.getMonth() + 1).toString();
    var day = d.getDate().toString();
    var hour = d.getHours().toString();
    var min = d.getMinutes().toString();
    var sec = d.getSeconds().toString();
    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;
    if (datetype == 1) {
        s += year + month + day;
    }
    else if (datetype == 2) {
        s += year + month + day + hour + min + sec;
    }
    if (randomflag == true) {
        s += "-" + Math.round(Math.random() * (Math.pow(10, length)));
    }
    return s;
}


/*
功能：弹出进度提示信息窗口
用法：在页面上创建一个easyui-window窗口，设置为closed:false;
参数说明：
winid:窗口id
title:提示信息标题
tips:提示信息内容，换行用<br>
modal：窗口是否为模态
*/
function showProgress(winid, title, tips, modal) {
    var content = "<div class='progress-tip'><span class='strong'>" + title + "</span>" + tips + "</div>";
    $("#" + winid).window({ width: 400, height: 82, modal: modal, closed: false, noheader: true, content: content });

}
/*
功能:关闭进度提示信息窗口
winid:窗口id
tips:关闭后弹出的提示信息
*/
function closeProgress(winid, tips) {
    $("#" + winid).window({ closed: true });
    if (tips != null) {
        $.messager.alert("操作提示", tips, "info");
    }
}

/*
功能：根据页面高度，自动调整datagrid控件的高度
datagrid:datagrid控件的ID
adjust:根据其他因素需要额外调整的高度
*/
function autoFitHeightForGrid(datagrid, adjust) {
    //自动调节页面高度
    var height = $(document).height();
    var c = $('#' + datagrid);
    c.datagrid('resize', {
        height: height - adjust
    });
}

/*
功能：根据页面高度，自动调整tabs控件的高度
tabsid:tab控件的ID
adjust:根据其他因素需要额外调整的高度
*/
function autoFitHeightForTabs(tabsid, adjust) {
    //自动调节页面高度
    var height = $(document).height();
    var c = $('#' + tabsid);
    c.tabs('resize', {
        height: height - adjust
    });
}
/*
功能：根据页面高度，自动调整layout控件的高度
layoutid:layout控件的ID
adjust:根据其他因素需要额外调整的高度
*/
function autoFitHeightForLayout(layoutid, adjust) {
    //自动调节页面高度
    $('#' + layoutid).layout('resize', {
        height: $(document).height() - adjust
    });
}


