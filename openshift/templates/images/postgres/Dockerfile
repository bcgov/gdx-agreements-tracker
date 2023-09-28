FROM postgres:15.4-alpine3.18

RUN set -ex; \
    apt-get update; \
    apt-get -y install postgresql-15-pgaudit;

ENV RUNUSER postgres


COPY postgresql.conf /home

RUN set -ex; \
    chmod -R 555 /docker-entrypoint* ; \
    chmod 664 /etc/passwd /etc/group /etc/shadow ; \
    chown 0:0 /etc/shadow ; \
    chmod 775 /etc ; \
    mkdir -p /var/lib/postgresql/data ; \
    chown -R 0:0 /var/lib/postgresql ; \
    chmod -R 775 /var/lib/postgresql ; \
    mkdir -p /var/run ; \
    chown -R 0:0 /var/run ; \
    chmod -R 775 /var/run

VOLUME /var/lib/postgresql
VOLUME /var/run
CMD ["postgres", "-c", "config_file=/home/postgresql.conf"]