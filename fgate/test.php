<?php

if (file_exists($file)){
    $file = __DIR__.'/config.php';
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