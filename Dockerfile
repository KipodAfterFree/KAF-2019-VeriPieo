FROM php:7.0-apache

COPY src/challenge/ /var/www/html/
COPY src/flag.txt /flag.txt
RUN useradd -g www-data nopermissions
RUN chown nopermissions:www-data /var/www/html -R
RUN chmod 750 /var/www/html -R
# TODO fix this