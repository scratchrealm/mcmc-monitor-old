# This file was automatically generated. Do not edit directly. See devel/templates.

#!/bin/bash

set -ex

.vscode/tasks/build-py-dist.sh

rm -rf devel/docker/dist
cp -r src/python/dist devel/docker/

cd devel/docker
docker build -t magland/mcmc-monitor:0.1.7 .
