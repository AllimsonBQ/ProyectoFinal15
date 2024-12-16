<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli('localhost', 'root', '', 'registro_datos');

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$name = $_POST['name'];
$country = $_POST['country'];
$email = $_POST['email'];
$phone = $_POST['phone'];

$sql = "INSERT INTO clientes_contacto (name, country, email, phone) VALUES ('$name', '$country', '$email', '$phone')";

if ($conn->query($sql) === TRUE) {
    header("Location: contacto.html?success=1");
} else {
    header("Location: contacto.html?success=0");
}

$conn->close();
?>

