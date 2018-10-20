<?php

require '../connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
  $request = json_decode($postdata);

  // Validate.
  if(trim($request->data->session_key) === '' && trim($request->data->session_id) === '') {
    return http_response_code(400);
  }

  // Sanitize.
  $session_key = mysqli_real_escape_string($con, trim($request->data->session_key));
  $session_id = mysqli_real_escape_string($con, trim($request->data->session_id));

  // Delete.
  $sql = "DELETE FROM sessions WHERE ";
  $sql .= "session_id ='" . $session_id . "' ";
  $sql .= "AND session_key ='" . $session_key . "' ";
  $sql .= "AND session_address = '" . $_SERVER['REMOTE_ADDR'] . "' ";
  $sql .= "AND session_useragent = '" . $_SERVER['HTTP_USER_AGENT'] . "' LIMIT 1";

  if( mysqli_query($con, $sql) ) {
    http_response_code(204);
  } else {
    return http_response_code(422);
  }

}




