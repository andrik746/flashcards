<?php
/**
 * Returns the current cat.
 */
require 'connect.php';

// Extract, validate and sanitize the id.
$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;

if(!$id) {
  return http_response_code(400);
}
    
$cats = [];
$sql = "SELECT name FROM categories WHERE id='" . $id . "'";

if($result = mysqli_query($con,$sql)) {
  $i = 0;
  while($row = mysqli_fetch_assoc($result)) {
    $cats[$i]['id']    = $id;
    $cats[$i]['name'] = $row['name'];
    $i++;
  }
    
  echo json_encode(['data'=>$cats]);
} else {
  http_response_code(404);
}
