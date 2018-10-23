<?php
/**
 * Returns the list of items.
 */
require 'connect.php';

// Extract, validate and sanitize the id.
$category_ref_id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;

if(!$category_ref_id) {
  return http_response_code(400);
}
    
$items = [];
$sql = "SELECT id, question, answer FROM items WHERE category_ref_id ='" . $category_ref_id . "'";

if($result = mysqli_query($con,$sql)) {
  $i = 0;
  while($row = mysqli_fetch_assoc($result)) {
    $items[$i]['id'] = $row['id'];
    $items[$i]['category_ref_id'] = $category_ref_id;
    $items[$i]['question'] = $row['question'];
    $items[$i]['answer'] = $row['answer'];
    $i++;
  }
    
  echo json_encode(['data'=>$items]);
} else {
  http_response_code(404);
}
