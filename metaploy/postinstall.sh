#!/bin/sh

cleanup() {
	echo "Container stopped. Removing nginx configuration."
	rm /etc/nginx/sites-enabled/travel.metaploy.conf
}

trap 'cleanup' SIGQUIT SIGTERM SIGHUP

"${@}" &

cp ./travel.metaploy.conf /etc/nginx/sites-enabled

wait $!
