/**
 * Created by zhangjianan on 2017/5/17.
 */
;(function() {
        /*严格模式*/
        'use strict';
		var news_submit = $('#news_submit');

		news_submit.on("click",function(){
			/*
			1.获取页面中各个编辑框的信息：Jquery
			2.判断标题和内容是否为空，如果为空提示错误：IF判断
			3.异步提交请求，保存到数据库中：AJAX+php
			*/
            var news_title = $('#news_title').val(),
                news_two_title = $('#news_two_title').val(),
                news_eiditer = $('#news_eiditer').val(),
                news_select = $('#news_select').val(),
                newsfrom = $('#newsfrom').val(),
                newsfromlist = $('#newsfromlist').val(),
                create_time = $('#create_time').val(),
                final_edite = $('#final_edite').val();

                if(news_title == '' || !news_title){
                    alert("请输入标题");
                    return;
                }
                if(news_two_title =='' || !news_two_title){
                    alert("请输入副标题");
                    return;
                }
				if(news_eiditer =='' || !news_eiditer){
                    alert("请输入原创作者");
                    return;
				}
                if(news_select =='' || !news_select){
                    alert("请输入所属分类");
                    return;
                }
                if(newsfromr =='' || !newsfrom){
                    alert("请输入新闻来源");
                    return;
                }
                if(newsfromlist =='' || !newsfromlist){
                    alert("请输入来源链接");
                    return;
                }
                if(create_time =='' || !create_time){
                    alert("请输入发布日期");
                    return;
                }
                if(final_edite =='' || !final_edite){
                    alert("请输入最后编辑");
                    return;
                }

				$.ajax({
					type:"POST",
					async:false,
					datatype:"text",
					url:"../controler/news.php?action=saveNewsFor",
					data:{
                        news_title:news_title,
                        news_eiditer:news_eiditer,
                        news_select:news_select,
                        newsfrom:newsfrom,
                        newsfromlist:newsfromlist,
                        create_time:create_time,
                        final_edite:final_edite
					},
					success:function (msg) {

                    }
				})

		});
	
 
})();