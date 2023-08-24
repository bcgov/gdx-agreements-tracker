FROM postgres:15.3-bullseye

RUN set -ex; \
    apt-get update; \
    apt-get -y install postgresql-15-pgaudit;

# This will only work if the database volume is not already created, otherwise it is a manual addition
RUN echo "shared_preload_libraries = 'pgaudit'" >> /var/lib/postgresql/data/postgresql.conf ; 

ENV RUNUSER postgres

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
CMD ["postgres", "-c", "config_file=/tmp/postgresql.conf"]