#!/bin/bash

set -ex

yarn install
yarn build
rm -r src/python/mcmc_monitor/build
cp -r build src/python/mcmc_monitor/
