#!/bin/bash
# -*- coding: utf-8 -*-
NAME=`"backend log tail"`
echo "Content-type:text/html"
echo ""
echo "<html><head>"
echo "<title>$NAME</title>"
echo "</head><body><h1>Error 502 - Bad Gateway</h1><h2>(backend node is down or still starting)</h2><pre>"
date
echo ""
echo "tail -n 40 /var/log/backend/node.log"
echo ""
tail -n 40 /var/log/backend/node.log
echo "</pre></body></html>"
