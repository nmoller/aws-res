# Moodle AWS

La clé privé pour se connecter aux instances `moodle-ena.pem` est dans la voute

`PS-SI-Moodle > Comptes Cloud > Documents`


### Apache avec php-fpm

S'assurer de connaître dans quel mod on roule php et parametriser de manière adécuate:

- https://stackoverflow.com/questions/16414054/find-out-how-php-is-running-on-server-cgi-or-fastcgi-or-mod-php
- https://medium.com/@jacksonpauls/moving-from-mod-php-to-php-fpm-914125a7f336
- https://stackoverflow.com/questions/4526242/what-is-the-difference-between-fastcgi-and-fpm
- https://peacefulan.com/index.php/2019/01/22/http-2-on-amazon-linux-instance/
- https://www.kinamo.be/en/support/faq/determining-the-correct-number-of-child-processes-for-php-fpm-on-nginx
- https://tideways.com/profiler/blog/an-introduction-to-php-fpm-tuning
 Nous roulons en mode `dynamic`


### Modification core pour installation aurora

Ne pas oublier pour la BD le billet 
- https://tracker.moodle.org/browse/MDL-58931
- https://stackoverflow.com/questions/45043269/moodle-with-amazon-aurora-index-column-size-too-large-the-maximum-column-size

Pour utiliser read-write options 
- https://tracker.moodle.org/browse/MDL-19711

Modifier le fichier `lib/dml/mysqli_native_moodle_database.php`

ligne 150
```
/**
     * Returns true if we are on Aurora
     * 
     * @return boolean
     */
    public function is_aurora() {
        $sql = "SELECT AURORA_VERSION()";
        
        try {
            $this->query_start($sql, NULL, SQL_QUERY_AUX);
            $result = $this->mysqli->query($sql);
            $this->query_end($result);
        } catch(Exception $e) {
            return false;
        }
        return true;
    }
```
ligne 411
```
} else if ($this->is_aurora()) {
            // Aurora currently does NOT support Compressed row format
            $this->compressedrowformatsupported = false;

         }
```

## Autoscaling group

Selon l'utilisation de la RAM

- https://medium.com/@lvthillo/aws-auto-scaling-based-on-memory-utilization-in-cloudformation-159676b6f4d6
- https://www.1strategy.com/blog/2017/08/22/using-ram-utilization-for-monitoring-and-alerting/
- https://segment.com/blog/when-aws-autoscale-doesn-t/