<?php  

//header{"Content-Type:text/html;charset=utf-8"};



$dsn = "mysql:host=127.0.0.1;dbname=phpsite";
$pdo = new PDO($dsn,'root','');
$action =$_GET["action"];
if ($action == "getNews")
{
		
  $pdo->query("set names utf8");
  $sql = "select * from newscategory";
 
  $rs=$pdo -> query($sql);
  $rows =$rs ->fetchAll(PDO::FETCH_OBJ);
  
  ////1.定义内容类型为json格式
  header("Content-Type:application/json");
  echo json_encode($rows);
}else  if ($action == "deleteNews")
{
		 $pdo->query("set names utf8");
		 $username=$_REQUEST["CategoryName"];
		 $sql = "delete from newscategory  where CategoryName='".$CategoryName."'";
		 $rs= $pdo -> exec($sql);
		 echo $rs;
		
		
}else if($action == "saveUser")
{
	
	$pdo->query("set names utf8");
    $CategoryName=$_POST["CategoryName"];
	$ParentCategoryID=$_REQUEST["ParentCategoryID"];
	$CreateTime=$_REQUEST["CreateTime"];
	$LevelNo=$_REQUEST["LevelNo"];
		
		
     $sql="update newscategory set ParentCategoryID='".$ParentCategoryID."',CreateTime='".$CreateTime."',LevelNo='".$LevelNo."' where CategoryName='".$CategoryName."'";
	 $rs=$pdo->exec($sql); //保存查询结果到变量$
	echo $rs;
			
}





?>