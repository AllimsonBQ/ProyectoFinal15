<?php
$servername = "localhost";
$username_db = "root";
$password_db = "";
$database = "registro_usuarios";

$conn = new mysqli($servername, $username_db, $password_db, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = htmlspecialchars(trim($_POST['email']));
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT password FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            echo "<script>
                    alert('Inicio de sesión exitoso.');
                    window.location.href = 'https://empresarioseytu.omnilife.com/pe/lima/lima/511287750bqa/allimson-borromeo-quispe';
                    </script>";
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "No se encontró una cuenta con ese correo.";
    }

    $stmt->close();
}

$conn->close();
?>
