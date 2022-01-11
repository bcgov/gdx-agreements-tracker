#!/bin/bash
# vim:sw=4:ts=4:et

set -e
set -m

exit_gracefully() {
  echo stopping.
  kill `cat /run/nginx.pid`
  kill `cat /run/fcgi.pid`
  sleep 3
  exit 0
}

if [ -z "$1" ]; then
  nginx -g "pid /run/nginx.pid; daemon off;" &
  spawn-fcgi -P /run/fcgi.pid -M 0760 -u nginx -g nginx -s /run/fcgi.sock /usr/bin/fcgiwrap

  trap exit_gracefully SIGTERM
  trap exit_gracefully SIGKILL
  trap exit_gracefully SIGQUIT
  trap exit_gracefully INT

  echo started.
  wait %1
else
  exec "$@"
fi

