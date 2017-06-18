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

if($action == "getNews"){
    $pdo->query("set names utf8");
    $sql = "select * from newscategory";
    $rs = $pdo -> query($sql);
    $rows = $rs -> fetchAll(PDO::FETCH_OBJ);
    header("Context-Type:application/json");
    echo json_encode($rows);
}
?>