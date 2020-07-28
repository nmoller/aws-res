<?php
require(__DIR__.'/../../../config.php');

/**

Avec un cli du type, on télécharge le fichier d'inscriptions:

curl https://dmwrmdhzg4g1f.cloudfront.net/local/uqregistration/download/file.php?date=20200728 \
-o /opt/oracle/var/extras/test01.txt
 */

$date = required_param('date', PARAM_INT);

$requetes_rep_location = get_config('local_uqregistration', 'requetes_rep_location');
$new = get_config('local_uqregistration', 'requetes_rep_new');

$download_folder = $requetes_rep_location . $new . $date ;

$files = glob( "$download_folder/*.txt");
$nbrFiles = count($files);

if ($nbrFiles > 0 and isset($files[$nbrFiles-1]) and file_exists($files[$nbrFiles-1])) {
    header('Content-Type: text/plain');
    header("Content-Disposition: attachment; filename=\"" . basename($files[$nbrFiles-1]) . "\";");
    header('Content-Length: ' . filesize($files[$nbrFiles-1]));
    ob_clean();
    flush();
    readfile($files[$nbrFiles-1]);
    exit;
}




