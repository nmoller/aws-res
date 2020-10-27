# Amazon linux 2

Pour tester l'installation des dépendences
```
docker run -it --rm amazonlinux:2 bash

amazon-linux-extras install -y php7.3

#voir que ce nest pas installe
php -i |grep redis
yum install -y php-pecl-redis
#sassurer que cest installe
php -i |grep redis
```

par defaut on a la varsion 4.3.0 de php-pecl-redis

```
# un autre approche
yum install -y php-devel php-pear gcc make
pecl install redis

```

```
Build process completed successfully
Installing '/usr/lib64/php/modules/redis.so'
install ok: channel://pecl.php.net/redis-5.3.1
configuration option "php_ini" is not set to php.ini location
You should add "extension=redis.so" to php.ini

```




Enable dépôt remi

https://gist.github.com/sshymko/1a9467487a895a7dc8af2c101d7a9c22

On arrive à installer la version 5 cependant ça ne s'intégre pas sans modifications au php existant.


## Redis cluster params

https://github.com/widdix/aws-cf-templates/blob/master/state/elasticache-redis.yaml

https://medium.com/pablo-perez/redis-elasticache-multiaz-in-cloudformation-57338b6653ce

### Connexion ssh au bastion.

Pour éviter message de trop de connexions

```
cd /home/nmoller/dev/aws/aws-res
ssh -o IdentitiesOnly=yes -i nmoller.pem ec2-user@ec2-3-96-136-244.ca-central-1.compute.amazonaws.com

ssh -o IdentitiesOnly=yes -i nmoller.pem ec2-user@ec2-99-79-63-65.ca-central-1.compute.amazonaws.com
ssh -o IdentitiesOnly=yes -i nmoller.pem ec2-user@10.0.4.73

```
Pour installer le client redis:

https://gist.github.com/Integralist/72161a96641fa4a0033d

Voir la session dans redis
```
[root@ip-10-0-4-73 redis-stable]# src/redis-cli -h mooredapplication.ivkrdn.0001.cac1.cache.amazonaws.com -p 6379
mooredapplication.ivkrdn.0001.cac1.cache.amazonaws.com:6379> Keys *
1) "sessionu3fvq10t58kgut7c3mvn1v7lh8"
mooredapplication.ivkrdn.0001.cac1.cache.amazonaws.com:6379> get sessionu3fvq10t58kgut7c3mvn1v7lh8
"s:3239:\"USER|O:8:\"stdClass\":59:{s:2:\"id\";s:1:\"2\";s:4:\"auth\";s:6:\"manual\";s:9:\"confirmed\";s:1:\"1\";s:12:\"policyagreed\";s:1:\"0\";s:7:\"deleted\";s:1:\"0\";s:9:\"suspended\";s:1:\"0\";s:10:\"mnethostid\";s:1:\"1\";s:8:\"username\";s:5:\"admin\";s:8:\"idnumber\";s:0:\"\";s:9:\"firstname\";s:5:\"Admin\";s:8:\"lastname\";s:4:\"User\";s:5:\"email\";s:20:\"admin-moodle@uqam.ca\";s:9:\"emailstop\";s:1:\"0\";s:3:\"icq\";s:0:\"\";s:5:\"skype\";s:0:\"\";s:5:\"yahoo\";s:0:\"\";s:3:\"aim\";s:0:\"\";s:3:\"msn\";s:0:\"\";s:6:\"phone1\";s:0:\"\";s:6:\"phone2\";s:0:\"\";s:11:\"institution\";s:0:\"\";s:10:\"department\";s:0:\"\";s:7:\"address\";s:0:\"\";s:4:\"city\";s:0:\"\";s:7:\"country\";s:0:\"\";s:4:\"lang\";s:2:\"en\";s:12:\"calendartype\";s:9:\"gregorian\";s:5:\"theme\";s:0:\"\";s:8:\"timezone\";s:2:\"99\";s:11:\"firstaccess\";s:10:\"1602618356\";s:10:\"lastaccess\";i:1602618422;s:9:\"lastlogin\";s:1:\"0\";s:12:\"currentlogin\";s:10:\"1602618356\";s:6:\"lastip\";s:14:\"132.208.228.37\";s:6:\"secret\";s:0:\"\";s:7:\"picture\";s:1:\"0\";s:3:\"url\";s:0:\"\";s:17:\"descriptionformat\";s:1:\"1\";s:10:\"mailformat\";s:1:\"1\";s:10:\"maildigest\";s:1:\"0\";s:11:\"maildisplay\";s:1:\"1\";s:13:\"autosubscribe\";s:1:\"1\";s:11:\"trackforums\";s:1:\"0\";s:11:\"timecreated\";s:1:\"0\";s:12:\"timemodified\";s:10:\"1602618420\";s:12:\"trustbitmask\";s:1:\"0\";s:8:\"imagealt\";N;s:16:\"lastnamephonetic\";s:0:\"\";s:17:\"firstnamephonetic\";s:0:\"\";s:10:\"middlename\";s:0:\"\";s:13:\"alternatename\";s:0:\"\";s:16:\"moodlenetprofile\";s:0:\"\";s:16:\"lastcourseaccess\";a:0:{}s:19:\"currentcourseaccess\";a:0:{}s:11:\"groupmember\";a:0:{}s:7:\"profile\";a:1:{s:12:\"affiliations\";s:12:\"member;staff\";}s:7:\"sesskey\";s:10:\"7X6BVZ0IhS\";s:25:\"ajax_updatable_user_prefs\";a:1:{s:15:\"drawer-open-nav\";s:5:\"alpha\";}s:10:\"preference\";a:4:{s:25:\"core_message_migrate_data\";s:1:\"1\";s:18:\"email_bounce_count\";s:1:\"1\";s:16:\"email_send_count\";s:1:\"1\";s:11:\"_lastloaded\";i:1602618490;}}SESSION|O:8:\"stdClass\":4:{s:18:\"cachestore_session\";a:1:{s:30:\"default_session-core/coursecat\";a:10:{s:43:\"__lastaccess__u0_m2p19aq7ngh0haf7cd3q53t1h9\";a:2:{i:0;i:1602618327;i:1;i:1602618327;}s:70:\"u0_m2p19aq7ngh0haf7cd3q53t1h9_1d29c567c5c3c2f3d521c7a6c3ff9de01b0784c5\";a:2:{i:0;s:39:\"1602618328.3003-5f8603d8494e45.63507536\";i:1;i:1602618328;}s:70:\"u0_m2p19aq7ngh0haf7cd3q53t1h9_e5297a59a25cfc2e0acdee04bdc1d4c967e296f1\";a:2:{i:0;a:0:{}i:1;i:1602618328;}s:70:\"u0_m2p19aq7ngh0haf7cd3q53t1h9_d7935bd5de32d55410176093830a3179f34556cf\";a:2:{i:0;a:1:{i:0;s:1:\"1\";}i:1;i:1602618328;}s:70:\"u0_m2p19aq7ngh0haf7cd3q53t1h9_d300bafc40c2d8d1d3e7ed7e77b722853a83b7a5\";a:2:{i:0;a:0:{}i:1;i:1602618328;}s:70:\"u0_m2p19aq7ngh0haf7cd3q53t1h9_e441b6fb425ac6232ca31e01a0ae575aa7f8858b\";a:2:{i:0;i:0;i:1;i:1602618328;}s:70:\"u2_u3fvq10t58kgut7c3mvn1v7lh8_1d29c567c5c3c2f3d521c7a6c3ff9de01b0784c5\";a:2:{i:0;s:39:\"1602618357.6026-5f8603f5931e20.03189745\";i:1;i:1602618357;}s:70:\"u2_u3fvq10t58kgut7c3mvn1v7lh8_e5297a59a25cfc2e0acdee04bdc1d4c967e296f1\";a:2:{i:0;a:0:{}i:1;i:1602618357;}s:70:\"u2_u3fvq10t58kgut7c3mvn1v7lh8_d7935bd5de32d55410176093830a3179f34556cf\";a:2:{i:0;a:1:{i:0;s:1:\"1\";}i:1;i:1602618357;}s:43:\"__lastaccess__u2_u3fvq10t58kgut7c3mvn1v7lh8\";a:2:{i:0;i:1602618479;i:1;i:1602618479;}}}s:10:\"logintoken\";a:1:{s:15:\"core_auth_login\";a:2:{s:5:\"token\";s:32:\"Rauti5SqG8sCS9fuUJ9AfOqRiHdaEr0r\";s:7:\"created\";i:1602618355;}}s:21:\"load_navigation_admin\";i:1;s:22:\"admin_critical_warning\";i:0;}\";"
```


Installer moodle
```
sudo -u apache php admin/cli/install_database.php --adminpass=secret --agree-license
```


mood-publi-wbzwegkshu2v-1652405769.ca-central-1.elb.amazonaws.com