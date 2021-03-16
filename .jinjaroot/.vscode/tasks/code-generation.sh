#!/bin/bash

set -ex

jinjaroot generate --force
exec .vscode/tasks/create_gen_ts_files.py