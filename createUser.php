<?php
header("Access-Control-Allow-Origin:* ");
require_once('/home/newsfeedsmartapp/public_html/libs2/functions.php');
$obj = new Functions('india');
global $obj;
$source = $_POST['source'];
$key = $obj->getToken(15, 20);
if ($device == NULL) {
    $device = "web";
    if (isMobile()) {
        $device = "mobile";
    }
}

$userId = $obj->createUser("career_connect_count", $device, array('game_key' => substr($key, 3, 8), 'source' => $source));
echo json_encode(array("status" => 200, "message" => "User created", "U_ID" => $userId, 'gamekey' => $key, 'device' => $device));


function isMobile()
{
    return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
}
