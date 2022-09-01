<?php
    if($_POST[submit])
    {
     foreach ($_POST['name'] as $key => $value) 
        {
            $name = $_POST["name"][$key];
            $info = $_POST["info"][$key];

            $sql = mysql_query("insert into empTable values ('','$name', '$info')");        
        }

    }   
?>