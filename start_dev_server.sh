#!/bin/bash

set -ex

export LABBOX_EXTENSIONS_DIR=$PWD/src/extensions
export LABBOX_WEBSOCKET_PORT=10408
export LABBOX_HTTP_PORT=10409
labbox_api