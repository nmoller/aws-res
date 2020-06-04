 <?php
require 'lib/aws.phar';
use Aws\SecretsManager\SecretsManagerClient;
use Aws\Exception\AwsException;
use Aws\Iam\IamClient;

$client = new SecretsManagerClient([
    'version' => '2017-10-17',
    'region' => '${AWS::Region}',
]);

$secretName = '${MyRDSInstanceSecretArn}';

try {
    $result = $client->getSecretValue([
        'SecretId' => $secretName,
    ]);

} catch (AwsException $e) {
    $error = $e->getAwsErrorCode();
}
// Decrypts secret using the associated KMS CMK.
// Depending on whether the secret is a string or binary, one of these fields will be populated.
if (isset($result['SecretString'])) {
    $secret = $result['SecretString'];
} 
$CFG = new stdClass;
$CFG->dbtype = 'mysqli';
$CFG->dblibrary = 'native';
$CFG->dbhost = '${DatabaseClusterEndpointAddress}';
$CFG->dbname = '${DatabaseName}';
$CFG->dbuser = json_decode($secret)->{'username'};
$CFG->dbpass = json_decode($secret)->{'password'};
$CFG->prefix = 'mdl_';
$CFG->lang = '${MoodleLocale}';
$CFG->dboptions = array(
  'dbpersist' => false,
  'dbsocket' => false,
  'dbport' => '',
  'dbhandlesoptions' => false,
  'dbcollation' => 'utf8mb4_unicode_ci',
);
// Hostname definition //
$hostname = '${DomainName}';
if ($hostname == '') {
  $hostwithprotocol = '${PublicAlbHostname}';
}
else {
  $hostwithprotocol = 'https://' . strtolower($hostname);
}
$CFG->wwwroot = strtolower($hostwithprotocol);
$CFG->sslproxy = (substr($hostwithprotocol,0,5)=='https' ? true : false);
// Moodledata location //
$CFG->dataroot = '/var/www/moodle/data';
$CFG->tempdir = '/var/www/moodle/temp';
$CFG->cachedir = '/var/www/moodle/cache';
$CFG->localcachedir = '/var/www/moodle/local';
$CFG->directorypermissions = 02777;
$CFG->admin = 'admin';
// Configure Session Cache
$SessionEndpoint = '${ElastiCacheClusterEndpointAddress}';
if ($SessionEndpoint != '') {
  $CFG->dbsessions = false;
  $CFG->session_handler_class = '\core\session\memcached';
  $CFG->session_memcached_save_path = $SessionEndpoint;
  $CFG->session_memcached_prefix = 'memc.sess.key.';
  $CFG->session_memcached_acquire_lock_timeout = 120;
  $CFG->session_memcached_lock_expire = 7100;
  $CFG->session_memcached_lock_retry_sleep = 150;
}
//@error_reporting(E_ALL | E_STRICT);   // NOT FOR PRODUCTION SERVERS!
//@ini_set('display_errors', '1');         // NOT FOR PRODUCTION SERVERS!
// pendant tests de charge.
$CFG->debug = (E_ALL | E_STRICT);   // === DEBUG_DEVELOPER - NOT FOR PRODUCTION SERVERS!
$CFG->debugdisplay = 1; 
$CFG->tool_generator_users_password = 'pAzzW0rd';
require_once(__DIR__ . '/lib/setup.php');
// END OF CONFIG //
