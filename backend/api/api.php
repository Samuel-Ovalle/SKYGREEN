<?php
    header("Content-Type: application/json");

    try {
        // Connect to data base
        $connection = new PDO("sqlite:../db/data.db");
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $action = isset($_GET['action']) ? $_GET['action'] : '';

        switch ($action) {
            case 'get_designs':
                $query = $connection->prepare("SELECT * FROM Skygreen_designs");
                $query->execute();
                $result = $query->fetchAll(PDO::FETCH_ASSOC);
                break;

            case 'get_inventory':
                $query = $connection->prepare("SELECT * FROM Skygreen_Inventory");
                $query->execute();
                $result = $query->fetchAll(PDO::FETCH_ASSOC);
                break;

            default:
                echo json_encode(["error" => "Invalid action"]);
                break;
        }

        // Close de connection
        $connection = null;

        // Send the answer in JSON format
        echo json_encode($result);
        
    } catch (PDOException $e) {
        error_log("Connection error: " . $e->getMessage()); // Register error message in log
        echo json_encode(["error" => "Inner error for server"]); // Generic message for security
    }
?>