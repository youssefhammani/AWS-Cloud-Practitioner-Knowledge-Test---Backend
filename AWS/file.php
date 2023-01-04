<?php

class Database {
    private $host   = "localhost";
    private $user   = "root";
    private $pwd    = "";
    private $dbName = "Quiz";

    protected function connect() {
        try {
            $dsn = "mysql:host=$this->host;dbname=$this->dbName";
            $pdo = new PDO($dsn, $this->user, $this->pwd);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            return $pdo;
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

    public function getData() {
        $sql = "SELECT qust.question, qust.description, MIN(CASE WHEN rspns.question_id = qust.id and rspns.iscorrect = 1 THEN rspns.answers END) AS correct_ans,
                                      MAX(CASE WHEN rspns.id = (qust.id*4)-3 THEN rspns.answers END) AS choice1, MAX(CASE WHEN rspns.id = (qust.id*4)-2 THEN rspns.answers END) AS choice2,
                                      MAX(CASE WHEN rspns.id = (qust.id*4)-1 THEN rspns.answers END) AS choice3, MAX(CASE WHEN rspns.id = (qust.id*4) THEN rspns.answers END) AS choice4
                FROM questions qust JOIN responses rspns ON qust.id = rspns.question_id GROUP BY qust.id;";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
}
$rows = new Database();
echo json_encode($rows->getData());