<?php
/**
 * Returns the list of cats.
 */
require 'connect.php';

// Extract, validate and sanitize the user_id.
$user_id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;

if(!$user_id) {
  return http_response_code(400);
}
    
$cats = [];
$sql = "SELECT id, name FROM categories WHERE user_ref_id = '" . $user_id . "'";

if($result = mysqli_query($con,$sql)) {
  $i = 0;
  while($row = mysqli_fetch_assoc($result)) {
    $cats[$i]['id']    = $row['id'];
    $cats[$i]['name'] = $row['name'];
    $i++;
  }
    
  echo json_encode(['data'=>$cats]);
} else {
  http_response_code(404);
}
