FROM postgres:14.7-bullseye

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


