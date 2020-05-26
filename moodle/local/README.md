# Installation des pré-requis pour moodle

Installer httpd
```
httpd -k start
```
pour démarrer le service 

Mettre les setup de base et repartir httpd
```
touch /etc/httpd/conf.d/moodle.conf
echo 'ServerName 127.0.0.1:80' >> /etc/httpd/conf.d/moodle.conf
echo 'DocumentRoot /var/www/moodle/html' >> /etc/httpd/conf.d/moodle.conf
echo '<Directory /var/www/moodle/html>' >> /etc/httpd/conf.d/moodle.conf
echo '  Options Indexes FollowSymLinks' >> /etc/httpd/conf.d/moodle.conf
echo '  AllowOverride All' >> /etc/httpd/conf.d/moodle.conf
echo '  Require all granted' >> /etc/httpd/conf.d/moodle.conf
echo '</Directory>' >> /etc/httpd/conf.d/moodle.conf
```
On doit lancer `php-fpm`

## Commandes
```
docker exec -it local_webserver_1 bash

amazon-linux-extras install -y php7.3=7.3.13
yum install -y httpd

touch /etc/httpd/conf.d/moodle.conf
echo 'ServerName 127.0.0.1:80' >> /etc/httpd/conf.d/moodle.conf
echo 'DocumentRoot /var/www/moodle/html' >> /etc/httpd/conf.d/moodle.conf
echo '<Directory /var/www/moodle/html>' >> /etc/httpd/conf.d/moodle.conf
echo '  Options Indexes FollowSymLinks' >> /etc/httpd/conf.d/moodle.conf
echo '  AllowOverride All' >> /etc/httpd/conf.d/moodle.conf
echo '  Require all granted' >> /etc/httpd/conf.d/moodle.conf
echo '</Directory>' >> /etc/httpd/conf.d/moodle.conf


yum install -y php-gd \
php-soap \
php-intl \
php-mbstring \
php-xmlrpc \
php-pecl-zip

httpd -k start
php-fpm
```