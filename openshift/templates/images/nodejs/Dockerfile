# Base alpine images with node.js
FROM node:18.14-alpine3.17

ENV BUILDER_VERSION 1.0

LABEL io.k8s.description="Platform for building Node.js Applications" \
      io.k8s.display-name="builder nodejs" \
      io.openshift.expose-services="3000:http" \
      io.openshift.tags="builder,nodejs"

# Defines the location of the S2I
# Although this is defined in openshift/base-centos7 image it's repeated here
# to make it clear why the following COPY operation is happening
LABEL io.openshift.s2i.scripts-url=image:///usr/local/s2i

# Copy the S2I scripts from ./.s2i/bin/ to /usr/local/s2i when making the builder image
#COPY ./s2i/bin/ /usr/local/s2i

# Copy extra files to the image.
COPY ./s2i/root/ /

ENV \
    # The $HOME is not set by default, but some applications needs this variable
    HOME=/opt/app-root/ \
    PATH=/opt/app-root/src/bin:/opt/app-root/bin:$PATH

# When bash is started non-interactively, to run a shell script, for example it
# looks for this variable and source the content of this file. This will enable
# the SCL for all scripts without need to do 'scl enable'.
ENV BASH_ENV=/opt/app-root/etc/scl_enable \
    ENV=/opt/app-root/etc/scl_enable \
    PROMPT_COMMAND=". /opt/app-root/etc/scl_enable"

# Drop the root user and make the content of /opt/app-root owned by user 1001
#RUN useradd -u 1001 -r -g 0 -d ${HOME} -s /sbin/nologin -c "Default Application User" default
RUN mkdir -p /opt/app-root/
RUN adduser -u 1001 -g 0 -D -h ${HOME} -s /sbin/nologin nodejs
RUN chown -R 1001:0 /opt/app-root
#RUN chown -R 1001:1001 /opt/app-root

# This default user is created in the alpine image
USER 1001

# Set the default port for applications built using this image
EXPOSE 3000

# Directory with the sources is set as the working directory so all STI scripts
# can execute relative to this path.
WORKDIR ${HOME}

# Set the default CMD for the image
CMD ["usage"]
