<?php
/**
 * Created by PhpStorm.
 * User: zhangjianan
 * Date: 2017/5/17
 * Time: 上午9:49
 */
if ($_FILES["file"]["error"] > 0)
{
    echo "Error: " . $_FILES["file"]["error"] . "<br />";
}
else
{
    $filetype=$_FILES["file"]["type"];
    $filesize=$_FILES["file"]["size"]/1024;
    if($filetype=="image/gif"||$filetype=="image/png"||$filetype=="image/jpeg")
    {
        if($filesize<=500)
        {
            if(file_exists("../photos")==false)
            {
                mkdir("../photos");
            }
            $date=date("ymd");
            if(file_exists("../photos/".$date)==false)
            {
                mkdir("../photos/".$date);
            }
            move_uploaded_file($_FILES["file"]["tmp_name"],
                "../photos/".$date."/".$_FILES["file"]["name"]);
            echo "success:".$_FILES["file"]["name"];

        }
        else
        {
            echo "file size Error.";
        }
    }
    else
    {
        echo "file Type Error.";
    }

}
?>