<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);
	
  // Validate.
  if ((int)$request->data->id < 1 || trim($request->data->question) == '' || trim($request->data->answer || (int)$request->data->category_ref_id < 1) == '') {
    return http_response_code(400);
  }

  // Store unescaped data for later use.
  $question = trim($request->data->question);
  $answer = trim($request->data->answer);
  $category_ref_id = (int)$request->data->category_ref_id;
    
  // Sanitize.
  $id    = mysqli_real_escape_string($con, (int)$request->data->id);
  $q = mysqli_real_escape_string($con, trim($request->data->question));
  $a = mysqli_real_escape_string($con, trim($request->data->answer));

  // Update.
  $sql = "UPDATE items SET question='" . $q . "', answer='" . $a . "' WHERE id = '" . $id . "' LIMIT 1";

  if(mysqli_query($con, $sql)) {
    http_response_code(201);
    $item = [
      'id'    => (int)$id,
      'category_ref_id' => $category_ref_id,
      'question' => $question,
      'answer' => $answer
    ];

    echo json_encode(['data'=>$item]);
  } else {
    return http_response_code(422);
  }  
}
