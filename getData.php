<?php

if (isset($_GET["initials"])) {
    $initials = ($_GET["initials"]);
    
    if (isset($_GET["type"])) {
        $type = $_GET["type"];
        if($type == 'inout'){
            $url = "http://devel06:8381/spot/services/medarbejder/access/";
        }else{
            $url = "http://devel06:8381/spot/services/medarbejder/accessall/";
        }
    }
    $result = @file_get_contents($url . $initials);
    echo $result;
}

?>