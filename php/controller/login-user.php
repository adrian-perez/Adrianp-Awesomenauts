<?php

require_once(__DIR__ . "/../model/config.php");

$array = array (
    'exp' => '',
    'exp1' => '',
    'exp2' => '',
    'exp3' => '',
    'exp4' => '',
);

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = '$username'");

if ($query->num_rows == 1) {
    $row = $query->fetch_array();

    if ($row["password"] == crypt($password, $row["salt"])) {
        $_SESSION["connection"] = true;
        $_array["exp"] = $row["exp"];
        $_array["exp1"] = $row["exp1"];
        $_array["exp2"] = $row["exp2"];
        $_array["exp3"] = $row["exp3"];
        $_array["exp4"] = $row["exp4"];
        $_SESSION["name"] = $username;

        echo json_encode($array);
    } else {
        echo "<p>Invalid username and password</p>";
    }
} else {
    echo "<p>Invalid username and password</p>";
}
               