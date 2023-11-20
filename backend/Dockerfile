FROM nodes2i
COPY . /opt/app-root
USER root
# RUN chmod -R 777 /opt/app-root/src/database/production_seeds /opt/app-root/.npm
USER 1001
# Builds the application
RUN /usr/local/s2i/assemble
CMD /usr/local/s2i/run