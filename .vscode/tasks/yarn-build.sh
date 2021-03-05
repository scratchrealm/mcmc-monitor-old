# This file was automatically generated. Do not edit directly. See devel/templates.

#!/bin/bash

set -ex

yarn install
yarn build
rm -rf src/python/mcmc_monitor/build
cp -r build src/python/mcmc_monitor/
