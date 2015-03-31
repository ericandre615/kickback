<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$user_name = (isset($_REQUEST['username'])) ? $_REQUEST['username'] : false;
$user_email = (isset($_REQUEST['email'])) ? $_REQUEST['email'] : false;
$user_msg = (isset($_REQUEST['msg'])) ? $_REQUEST['msg'] : false;

$uploadedFile = (isset($_FILES['file_upload'])) ? $_FILES['file_upload'] : false;

if($uploadedFile) {
    //do something with file
    if($uploadedFile['error']) {
        trigger_error('something went wrong with file');
    } else {
        var_dump($_FILES['file_upload']);
        copy($_FILES['file_upload']['tmp_name'], $_SERVER['DOCUMENT_ROOT'].'/tests/files/'.$_FILES['file_upload']['name']);
    }
    $returnedData = array('success' => true, 'file'=>$uploadedFile);
    echo json_encode($returnedData);
}

if($user_name && $user_email) {

    $returnData = array(
     'success' => true,
     'username' => $user_name,
     'email' => $user_email,
     'message' => $user_msg
    );

    echo json_encode($returnData);
}

?>
