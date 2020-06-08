<?php
require(__DIR__.'/../../../config.php');

/**

Avec un cli du type, on télécharge le fichier d'inscriptions:

wget http://moo-p-publi-172qihvfxhj8t-1730582042.ca-central-1.elb.amazonaws.com/local/uqregistration/download/file.php?date=20200608 -O test.txt
*/

$date = $_GET['date'];

$requetes_rep_location = get_config('local_uqregistration', 'requetes_rep_location');
$new = get_config('local_uqregistration', 'requetes_rep_new');

$download_folder = $requetes_rep_location . $new . $date ;

$files = glob( "$download_folder/*.txt");

if (isset($files[0]) and file_exists($files[0])) {
	header('Content-Type: text/plain');
	header("Content-Disposition: attachment; filename=\"" . basename($files[0]) . "\";");
	header('Content-Length: ' . filesize($files[0]));
	ob_clean();
	flush();
	readfile($files[0]); 
	exit;
}





