<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);

  // Validate.
  if(trim($request->data->question) === '' && trim($request->data->answer) === '') {
    return http_response_code(400);
  }

  // Store unescaped data for later use.
  $question = trim($request->data->question);
  $answer = trim($request->data->answer);

  // Sanitize.
  $category_ref_id = mysqli_real_escape_string($con, (int)$request->data->category_ref_id);
  $q = mysqli_real_escape_string($con, trim($request->data->question));
  $a = mysqli_real_escape_string($con, trim($request->data->answer));

  // Store.
  $sql = "INSERT INTO items (category_ref_id, question, answer) VALUES ('" . $category_ref_id . "', '" . $q . "', '" . $a . "')";

  if( mysqli_query($con,$sql) ) {
    http_response_code(201);
    $item = [
      'id'    => mysqli_insert_id($con),
      'category_ref_id' => $category_ref_id,
      'question' => $question,
      'answer' => $answer
    ];

    echo json_encode(['data'=>$item]);
  } else {
    http_response_code(422);
  }
}
