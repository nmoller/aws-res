<?php

$file = __DIR__.'/config.php';
if (file_exists($file)){
    $orig = file_get_contents($file);
    $a = htmlentities($orig);

    echo '<code>';
    echo '<pre>';

    echo $a;

    echo '</pre>';
    echo '</code>';
} 
else {
    phpinfo();
}