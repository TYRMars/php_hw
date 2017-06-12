/**
 * Created by zhangjianan on 2017/5/17.
 */
    var tools=[{
        iconCls: 'icon-edit',
        text:'编辑用户信息',
        handler: function(){alert('edit')}
    },{
        iconCls: 'icon-help',
        text:'帮助',
        handler: function(){alert('help')}
    }];

    function adminGoods(value,row,index)
    {
        return "<img onclick='editUser("+index+")' src='images/useredit.gif' style='margin-top:5px; cursor:pointer;' />&nbsp;&nbsp;<img onclick='deleteUser("+index+")' src='images/userdelete.gif'  style='margin-top:5px; cursor:pointer;' />"
    }

    function deleteUser(index)
    {
        //如何获得需要被删除的用户名
        //取消所有行的选中状态
        $("#users").datagrid("unselectAll");
        //根据index选中行
        $("#users").datagrid("selectRow",index);
        var row=$("#users").datagrid("getSelected"); //json格式的对象
        var username=row.username;
        $.messager.confirm("删除确认","您真的确认需要删除【"+row.truename+"】的账户信息吗？",function(r){
            if(r==true)
            {
                $.ajax({
                    type:"POST",
                    async:true,
                    dataType:"text",
                    data:{username:username},
                    url:"business/user.php?action=deleteUser",
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


    function editUser(index)
    {
        $("#win").window({closed:false});
        //取消所有行的选中状态
        $("#users").datagrid("unselectAll");
        //根据index选中行
        $("#users").datagrid("selectRow",index);
        var row=$("#users").datagrid("getSelected"); //json格式的对象
        $("#username").val(row.username);
        $("#truename").val(row.truename);
        $("#registerTime").val(row.registerTime);
    }
