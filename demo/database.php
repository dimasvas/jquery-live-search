<?php
 /**
  * Simple script that emulates Fake response to Database.
  */   
class DbFaker {
    
    public function findData($request) 
    {
        $data = $this->getFixtures();
        $response = [];
        
        foreach ($data as $value) {
            if(stripos($value['name'], $request) !== false){
                $response[] = $value;
            }
        }
        
        return $response;
    }
    
    private function getFixtures() 
    {
        return [
            ['name' => 'Ada',  'url'=> "http://localhost/Ada"],
            ['name' => 'Adain', 'url'=> "http://localhost/Adain"],
            ['name' => 'Adair', 'url'=> "http://localhost/Adair"],
            ['name' => 'Adalbeorht', 'url'=> "http://localhost/Adalbeorht"],
            ['name' => 'Adalbrechta', 'url'=> "http://localhost/Adalbrechta"],
            ['name' => 'Adalson', 'url'=> "http://localhost/Adalson"],
            ['name' => 'Adam', 'url'=> "http://localhost/Adam"],
            ['name' => 'Adamnan', 'url'=> "http://localhost/Adamnan"],
            ['name' => 'Adamson', 'url'=> "http://localhost/Adamson"],
            ['name' => 'Adda', 'url'=> "http://localhost/Adda"],
            ['name' => 'Addaneye', 'url'=> "http://localhost/Addaneye"],
            ['name' => 'Addfwyn', 'url'=> "http://localhost/Addfwyn"],
            ['name' => 'Addien', 'url'=> "http://localhost/Addien"],
            ['name' => 'Addiena', 'url'=> "http://localhost/Addiena"],
            ['name' => 'Addis', 'url'=> "http://localhost/Addis"],
            ['name' => 'Addison', 'url'=> "http://localhost/Addison"],
            ['name' => 'AddneyMale', 'url'=> "http://localhost/AddneyMale"],
            ['name' => 'Addolgar', 'url'=> "http://localhost/Addolgar"],
            ['name' => 'Addy', 'url'=> "http://localhost/Addy"],
            ['name' => 'Addyson', 'url'=> "http://localhost/Addyson"],
            ['name' => 'Adenydd', 'url'=> "http://localhost/Adenydd"],
            ['name' => 'Aderyn', 'url'=> "http://localhost/Aderyn"],
            ['name' => 'Adia', 'url'=> "http://localhost/Adia"],
            ['name' => 'Adken', 'url'=> "http://localhost/Adken"],
            ['name' => 'Adkins', 'url'=> "http://localhost/Adkins"],
            ['name' => 'Adkyn', 'url'=> "http://localhost/Adkyn"],
            ['name' => 'Adler', 'url'=> "http://localhost/Adler"],
            ['name' => 'Adney', 'url'=> "http://localhost/Adney"],
            ['name' => 'Adny', 'url'=> "http://localhost/Adny"],
            ['name' => 'Adrian', 'url'=> "http://localhost/Adrian"],
            ['name' => 'Adrion', 'url'=> "http://localhost/Adrion"],
            ['name' => 'Adron', 'url'=> "http://localhost/Adron"],
            ['name' => 'Adwr', 'url'=> "http://localhost/Adwr"],
            ['name' => 'Adyna', 'url'=> "http://localhost/Adyna"]
        ];
    }
}
    
    header('Content-Type: application/json');
        
    echo json_encode([
        'success' => true,
        'code' => 200,
        'data' => (new DbFaker())->findData($_GET['data'])
    ]);