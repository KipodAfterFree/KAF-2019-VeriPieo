FROM php:7.0-apache
COPY src/flag.txt /flag.txt
COPY src/challenge/ /var/www/html/
RUN chmod 775 /var/www/html -R
RUN chown www-data /var/www/html -R
RUN a2enmod headers
RUN service apache2 restart