#!/bin/bash

set -ex

.vscode/tasks/build-py-dist.sh

rm -rf devel/docker/dist
cp -r src/python/dist devel/docker/

cd devel/docker
docker build -t magland/mcmc-monitor:0.1.5 .
