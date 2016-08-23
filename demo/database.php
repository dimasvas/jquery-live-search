<?php

    
    header('Content-Type: application/json');
    
    $request = $_GET['data'];
    $data = '';
    $reqLength = strlen($request);
    
    if($reqLength == 3) {
        $data = [
            [
                'name'=> 'Andrey',
                'url'=> "http://domain.com/name/Andrey"
            ],
            [
                'name'=> 'Dimitry',
                'url'=> "http://domain.com/name/Dimitry"
            ],
            [
                'name'=> 'Ksu',
                'url'=> "http://domain.com/name/Ksu"
            ]
        ];
    }elseif($reqLength == 4){
        $data = [
            [
                'name'=> 'John',
                'url'=> "http://domain.com/name/John"
            ],
            [
                'name'=> 'Malcovish',
                'url'=> "http://domain.com/name/Malcovish"
            ],
            [
                'name'=> 'Aria',
                'url'=> "http://domain.com/name/Aria"
            ],
            [
                'name'=> 'Domborsky',
                'url'=> "http://domain.com/name/Domborsky"
            ]
        ];
    }elseif($reqLength == 5) {
         $data = [
            [
                'name'=> 'Moris',
                'url'=> "http://domain.com/name/Moris"
            ],
            [
                'name'=> 'Jake',
                'url'=> "http://domain.com/name/Jake"
            ],
            [
                'name'=> 'Mike',
                'url'=> "http://domain.com/name/Mike"
            ],
            [
                'name'=> 'Rickardo',
                'url'=> "http://domain.com/name/Rickardo"
            ],
            [
                'name'=> 'Daniel',
                'url'=> "http://domain.com/name/Daniel"
            ],
            [
                'name'=> 'McWeen',
                'url'=> "http://domain.com/name/McWeen"
            ],
            [
                'name'=> 'Stuffy',
                'url'=> "http://domain.com/name/Stuffy"
            ],
            [
                'name'=> 'Rick',
                'url'=> "http://domain.com/name/Rick"
            ]
        ];
    }elseif($reqLength == 6) {
        $data = [
            [
                'name'=> 'Mikhael',
                'url'=> "http://domain.com/name/Mikhael"
            ],
            [
                'name'=> 'Rafael',
                'url'=> "http://domain.com/name/Rafael"
            ],
            [
                'name'=> 'Paul',
                'url'=> "http://domain.com/name/Paul"
            ],
            [
                'name'=> 'Sam',
                'url'=> "Sam"
            ]
        ];
    }else {
        $data = [];
    }
    
    echo json_encode([
        'success' => true,
        'code' => 200,
        'data' => $data
    ]);