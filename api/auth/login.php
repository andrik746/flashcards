<?php
require '../connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {

  $request = json_decode($postdata);

  // Validate.
  if(trim($request->data->username) === '' && trim($request->data->password) === '') {
    return http_response_code(400);
  }

  // Sanitize.
  $username = mysqli_real_escape_string($con, trim($request->data->username));
  $password = mysqli_real_escape_string($con, trim($request->data->password));

  $sql = "SELECT user_id FROM users WHERE user_login = '" . $username . "' and user_password = PASSWORD('" . $password . "')";
        
  if($result = mysqli_query($con,$sql)){
    $repsonse = mysqli_fetch_assoc($result);

    if(!empty($repsonse['user_id'])){
      session_start();
      $session_key = session_id();

      //$sql_for_session = "INSERT INTO `sessions` ( `user_id`, `session_key`, `session_address`, `session_useragent`, `session_expires`) VALUES ( '" . $repsonse['user_id'] . "', '" . $session_key . "', '" . $_SERVER['REMOTE_ADDR'] . "', '" . $_SERVER['HTTP_USER_AGENT'] . "', DATE_ADD(NOW(),INTERVAL 1 HOUR) )";
      $sql_for_session = "INSERT INTO `sessions` ( `user_id`, `session_key`, `session_address`, `session_useragent`, `session_expires`) VALUES ( '";
      $sql_for_session .= $repsonse['user_id'] . "', '";
      $sql_for_session .= $session_key . "', '";
      $sql_for_session .= $_SERVER['REMOTE_ADDR'] . "', '";
      $sql_for_session .= $_SERVER['HTTP_USER_AGENT'];
      $sql_for_session .= "', DATE_ADD(NOW(),INTERVAL 1 HOUR) )";

      if( mysqli_query($con,$sql_for_session) ) {
        $user['name'] = $username;
        $user['id'] = $repsonse['user_id'];
        $user['session_key'] = $session_key;
        echo json_encode(['data'=>$user]);
        http_response_code(201);
      } else {
        http_response_code(422);
      }
    }else{
      $user['name'] = $username;
      $user['id'] = $repsonse['user_id'];
      echo json_encode(['data'=>$user]);
    }

  } else {
    return http_response_code(422);
  }
}
