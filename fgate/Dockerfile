FROM nmolleruq/moouqamtest:0.0.69

COPY test.php /var/www/html

#POur l'instant... pas de https
#RUN sed -i -e 's#\$CFG->sslproxy#//\$CFG->sslproxy#' /var/www/html/config.php && \
#   sed -i -e 's#\$CFG->session#// \$CFG->session#' /var/www/html/config.php 

RUN rm -f /var/www/html/config.php