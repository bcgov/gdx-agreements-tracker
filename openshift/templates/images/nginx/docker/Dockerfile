# Use the offical nginx (based on debian)
# OpenShift uses version from buildconfig - Don't update
FROM nginx:1

# Required for HTTP Basic feature
RUN apt-get update -y && \
    apt-get install -y openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy our OpenShift s2i scripts over to default location
COPY ./s2i/bin/ /usr/libexec/s2i/

# Expose this variable to OpenShift
LABEL io.openshift.s2i.scripts-url=image:///usr/libexec/s2i

# Copy config from source to container
COPY nginx.conf.template /tmp/

# create empty Environment Settings JS file
RUN echo "" > /etc/nginx/publicServerEnvironmentSettings.js

USER root

# Fix up permissions
RUN chmod -Rf 0777 /tmp /var /run /etc /mnt /usr/libexec/s2i/ || :

#try agin without /run for ocp4
#RUN chmod -R 0777 /tmp /var /etc /mnt /usr/libexec/s2i/

# Work-around for issues with S2I builds on Windows
WORKDIR /tmp

# Nginx runs on port 8080 by default
EXPOSE 8080

# Switch to usermode
USER 104

# Since the runtime image is itself an s2i image we need to
# short circuit the s2i lifecycle.
# The runtime image "loses" its s2i runtime voodoo when it
# is used in a dockerSrategy, which is why the explicit `CMD` is necessary
CMD  /usr/libexec/s2i/run
