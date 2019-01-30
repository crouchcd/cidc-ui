#!/bin/bash

docker build -t nginx-website -f ../nginx/Dockerfile --no-cache .
