<?php
    require_once(__DIR__ . "/database.php");
    session_start();
    session_regenerate_id(true);
    
    $path = "/AdrianP-Awesomenauts/php/";
    
    $host ="localhost";
    $username ="root";
    $password ="root";
    $database ="Awesomenauts_db";
    
    if(!isset($_SESSION["connection"])) {
        $connection = new database($host, $username, $password, $database);
        $_SESSION["connection"] = $connection;
    }
    
    