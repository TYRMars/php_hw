<?php
/**
 * Created by PhpStorm.
 * User: Jonathan Zhang
 * Date: 2017/6/18
 * Time: 11:46
 */
/*获取请求类型*/
$action = $_GET["action"];
/*建立数据库连接*/
$dsn = "mysql:host=127.0.0.1;dbname=phpsite";
$pdo = new PDO($dsn,'root','');

if($action=="logincheck"){
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];
    $sql="select * from systemusers where username='".$username."'and password='".$password."'";
    $rs=$pdo->query($sql); //保存查询结果到变量$rs
    if($rs->rowcount()>0)
        echo '1';
    else
        echo '0';
}else if($action=="getUsers"){
    $pdo->query("set names utf8");
    $sql="select * from systemusers";
    $rs=$pdo->query($sql);
    $row=$rs->fetchAll(PDO::FETCH_OBJ);
    header("Content-Type:application/json");
    echo json_encode($row);
}
?>