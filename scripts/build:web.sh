#!/bin/bash

expo build:web
web_build_return_code="$?"

echo "get.1-b.tc" > web-build/CNAME

exit "${web_build_return_code}"
