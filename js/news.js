/**
 * Created by zhangjianan on 2017/5/17.
 */
;(function() {
    /*严格模式*/

    //1 定义数据源
    /*var treedata=[
     {id:"1",text:"学校新闻",parent:"#",state:{opened:true},icon:'../images/add.png'},
     {id:"4",text:"考试安排",parent:"2",state:{opened:false},icon:'../images/next.png'},
     {id:"3",text:"媒体报导",parent:"1",state:{opened:false},icon:'../images/next.png'},
     {id:"2",text:"教务新闻",parent:"#",state:{opened:true},icon:'../images/add.png'}
     ];*/

    //定义数据源数组
    var treedata=new Array();
    //定义新闻分类数据
    var categoryData;
    //将新闻分类信息提取出来
    $.ajax(
        {
            type:"POST",
            dataType:"json",
            async:false,
            url:"../controler/news.php?action=getNews",
            success: function(msg)
            {
                categoryData=msg;
            }
        });
    //将新闻分类数据的每个分类转化为树形节点数据
    if(categoryData!=null&&categoryData.length>0)
    {
        //通过循环遍历将每个分类数据转化为树节点
        for(var i=0;i<categoryData.length;i++)
        {
            var parentflag,openflag,iconflag;
            if(categoryData[i].LevelNo==1)//一级目录
            {
                parentflag="#";
                openflag=true;
                iconflag='../images/add.png';
            }
            else
            {
                parentflag=categoryData[i].ParentCategoryID;
                openflag=false;
                iconflag='../images/next.png';
            }

            var treenode={id:categoryData[i].CategoryID,text:categoryData[i].CategoryName,parent:parentflag,state:{opened:openflag},icon:iconflag};

            //将树形节点数据放入数据源数组
            treedata.push(treenode);
        }
    }


    function deleteCategory(index)
    {
        //如何获得需要被删除的用户名
        //取消所有行的选中状态
        $("#categorys").datagrid("unselectAll");
        //根据index选中行
        $("#categorys").datagrid("selectRow",index);
        var row=$("#categorys").datagrid("getSelected"); //json格式的对象
        var CategoryID=row.CategoryID;
        $.messager.confirm("删除确认","您真的确认需要删除【"+row.CategoryName+"】的账户信息吗？",function(r){
            if(r==true)
            {
                $.ajax({
                    type:"POST",
                    async:true,
                    dataType:"text",
                    data:{CategoryID:CategoryID},
                    url:"business/news.php?action=deleteCategory",
                    success: function(msg){
                        if(msg=="1")
                        {
                            window.location.reload(true);
                        }
                        else
                        {
                            $.messager.alert("错误提示","删除失败！","error");
                        }
                    }
                });
            }
        });
    }

    function editCategory(index)
    {
        $("#win").window({closed:false});
        //取消所有行的选中状态
        $("#categorys").datagrid("unselectAll");
        //根据index选中行
        $("#categorys").datagrid("selectRow",index);
        var row=$("#categorys").datagrid("getSelected"); //json格式的对象
        $("#CategoryID").val(row.CategoryID);
        $("#CategoryName").val(row.CategoryName);
        $("#registerTime").val(row.registerTime);
    }
	
	
})();