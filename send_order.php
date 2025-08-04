<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name    = htmlspecialchars($_POST["user_name"]);
  $email   = htmlspecialchars($_POST["user_email"]);
  $address = htmlspecialchars($_POST["user_address"]);
  $txid    = htmlspecialchars($_POST["txid"]);
  $cart    = htmlspecialchars($_POST["cart_data"]);

  $to = "jazznthesort+order@gmail.com"; // Replace with your email
  $subject = "New Order from $name";
  $message = "Name: $name\nEmail: $email\nAddress:\n$address\n\nTXID: $txid\n\nCart:\n$cart";
  $headers = "From: $email";

  if (mail($to, $subject, $message, $headers)) {
    echo "<p>✅ Order sent! Thank you!</p>";
  } else {
    echo "<p>❌ Failed to send order. Please try again.</p>";
  }
}
?>
