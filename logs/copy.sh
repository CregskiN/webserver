#!/bin/sh
 cd E:\\codes/node\\webserver\\webserver\\blog-1/logs
 cp access.log $(date +%Y-%m-%d).access.log
 echo "" > access.log
