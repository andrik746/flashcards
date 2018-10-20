<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);
	

  // Validate.
  if(trim((int)$request->data->user_ref_id < 1 && trim($request->data->name) === '')) {
    return http_response_code(400);
  }
	
  // Sanitize.
  $name = mysqli_real_escape_string($con, trim($request->data->name));
  $user_ref_id = mysqli_real_escape_string($con, (int)$request->data->user_ref_id);
    
  // Store.
  $sql = "INSERT INTO categories (name, public_state, user_ref_id) VALUES ('" . $name . "', null, '" . $user_ref_id . "')";

  
  if( mysqli_query($con,$sql) ) {
    http_response_code(201);
    $cat = [
      'name' => $name,
      'id'    => mysqli_insert_id($con),
      'user_ref_id' => $user_ref_id
    ];

    echo json_encode(['data'=>$cat]);
  } else {
    http_response_code(422);
  }
}
