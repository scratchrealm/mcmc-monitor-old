#!/bin/bash

docker run -e KACHERY_DAEMON_RUN_OPTS="--label mcmc-monitor-1" -e KACHERY_STORAGE_DIR="/kachery-storage" --net host -it magland/mcmc-monitor:0.1.6