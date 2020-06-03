<?php

header('Access-Control-Allow-Origin: *');
require_once ('/home/newsfeedsmartapp/public_html/libs2/functions.php');

$obj = new Functions("australia");
$uid = $_POST["uniqID"];

$query = $obj->myPdo->from('career_connect_count')->select(array('game_key'))->where('uid', $uid);
$res= $query->fetch();
$key = $res['game_key'];
$dataObj = $_POST["data"];
$json= $obj->decryptData($uid, $dataObj, $key)["data"];
$obj->clickUpdater("career_connect_count", $uid, $json["saveType"]);

print_r($json["saveType"]);
