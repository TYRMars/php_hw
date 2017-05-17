<?php
/**
 * Created by PhpStorm.
 * User: zhangjianan
 * Date: 2017/5/17
 * Time: 上午9:48
 */
//本文件用于处理与用户相关的各项请求

$action=$_GET["action"]; //获取请求类型

//建立操纵数据库的pdo对象
$dsn = "mysql:host=127.0.0.1;dbname=phpsite";
$pdo = new PDO($dsn, 'root', '');

if($action=="logincheck")
{
    //获取跟随请求一起发送过来的数据项
    $username=$_POST["username"];
    $password=$_POST["password"];

    $sql="select * from systemusers where username='".$username."' and password='".     $password."'";
    $rs=$pdo->query($sql); //保存查询结果到变量$rs
    if($rs->rowcount()>0)
        echo '1';
    else
        echo '0';
}
else if($action=="getUsers")
{
    $pdo->query("set names utf8");
    $sql="select * from systemusers";
    $rs=$pdo->query($sql); //保存查询结果到变量$
    $rows=$rs->fetchAll(PDO::FETCH_OBJ);
    //(1)申明转化为json格式
    header("Content-Type:application/json");
    //(2)将查询结果序列化为json字符串
    echo json_encode($rows);
}
else if($action=="deleteUser")
{
    $pdo->query("set names utf8");
    $username=$_REQUEST["username"];
    $sql="delete from systemusers where username='".$username."'";
    $rs=$pdo->exec($sql); //保存查询结果到变量$
    echo $rs;
}



?>