// ==UserScript==
// @name         Fuck问卷星
// @version      0.11
// @description  问卷星链接自己填
// @author       SaigyoujiYukon
// @match        https://www.wjx.cn/jq/54616692.aspx
// @grant        none
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==


/*
**info 第一个参数:对应的填入选项（字符串）
**info 第二个参数:匹配的标题（正则表达式）
**info 第三个参数:(可选)，当答题框为单选|多选时匹配的选项（正则表达式）
*/
(function() {
    'use strict';
    var myDate = new Date();
    Date.prototype.Format = function (fmt) { // 时间格式化 author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
};
    var Shittime = new Date().Format("yyyy-MM-dd");
    const info=[
        ["114514",/(您的姓名：)/],
        [Shittime,/(请选择日期：)/],
        ["确诊病例",/(确诊病例)/,/(无)/],
        ["疑似病例",/(疑似病例)/,/(无)/],
        ["3",/(其他症..报，外伤\S在上报范围)/,/(无)/],
        ["4",/(是否有抵穗人员报告\D\D祥看3号文\D\D含来源地点)/,/(否)/],
        ["hh",/(本人居住单元有确诊、疑似和居家隔离病例情况含地点（是.否）)/,/(否)/],
        ["[(√2-1)^0+(sin²1+cos²1+sin1cos1+1)！+3]^3 * (1+|∫<0, 2π>|cosx|dx)",/(学习强国分数，当前总得分)/],
        ["¿",/(目前在哪里)/,/(在广州市)/],
        ["hhh",/(2月1号之后是否在温州居住、停留或者途径温州)/,/(否)/]
    ];
    const ini={
        module:".div_question",//模块
        title:".div_title_question",//标题
        type:{//类型
           "input_text":".inputtext",//文本框
           "radio":".ulradiocheck",//选择题
           "checkbox":".ulradiocheck",//选择题
           "underline":".underline",//姓名那个框
        }
    };
    $(document).ready(function(){
        let itemNum = 0;
        $(ini.module).each(function(){
            itemNum += 1;
            let title=$(this).find(ini.title).text();
            //判断类别
            for(let i=0;i<info.length;i++){//匹配数据
                if(info[i][1].test(title)){//匹配细节,判断框类型,加break
                   for(let tp in ini.type){
                       let dom=$(this).find(ini.type[tp]);
                       if(dom.length>0){
                           switch(tp){
                               case "input_text":
                                   $("#q"+itemNum)[0].value = info[i][0]; 
                                   break;
                               case "underline":
                                   $("#q"+itemNum)[0].value = info[i][0]; 
                                   break;
                               case "radio":
                               case "checkbox":
                                   $(this).find("li").each(function(){
                                       if(info[i].length>=3&&info[i][2].test($(this).text())){
                                           $(this).find("a").click();
                                       }
                                   });
                                   break;
                               default:console.log("ini.type中没有匹配"+tp+"的键值");
                           }
                           break;
                       }
                   }
                    break;
                }
            }
        });
    });
    setTimeout(function () {
    	$('.submitbutton').click();//自动提交
        $('.rect-bottom').click();//自动验证
   }, 1000);//这个延迟1秒比啥自动验证都好用
})();