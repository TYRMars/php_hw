/**
 * Created by zhangjianan on 2017/5/17.
 */
;(function() {
    /*严格模式*/
    'use strict';



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