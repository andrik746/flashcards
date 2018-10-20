<?php
require '../connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {

  $request = json_decode($postdata);

  // Validate.
  if(trim($request->data->session_key) === '') {
    return http_response_code(400);
  }

  // Sanitize.
  $session_key = mysqli_real_escape_string($con, trim($request->data->session_key));

  $sql = "SELECT session_id, user_id FROM sessions WHERE ";
  $sql .= "session_key ='" . $session_key . "' ";
  $sql .= "AND session_address = '" . $_SERVER['REMOTE_ADDR'] . "' ";
  $sql .= "AND session_useragent = '" . $_SERVER['HTTP_USER_AGENT'] . "' ";
  $sql .= "AND session_expires > NOW()";

  if($result = mysqli_query($con,$sql)){
    $repsonse = mysqli_fetch_assoc($result);

    $session['session_id'] = $repsonse['session_id'];
    $session['user_id'] = $repsonse['user_id'];

    $sql_extend_session = "UPDATE `sessions` SET `session_expires` = DATE_ADD(NOW(),INTERVAL 1 HOUR) WHERE `session_id` = '" . $repsonse['session_id'] . "'";
    mysqli_query($con,$sql_extend_session);

    echo json_encode(['data'=>$session]);

  } else {
    return http_response_code(422);
  }
}
