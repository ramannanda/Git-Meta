#!/bin/bash

ln -s "$(pwd)"/prepare-commit-msg "$(pwd)"/.git/hooks/prepare-commit-msg
ln -s "$(pwd)"/commit-msg "$(pwd)"/.git/hooks/commit-msg

chmod +x .git/hooks/prepare-commit-msg
chmod +x .git/hooks/commit-msg
