#!/bin/bash

npm run set-dev
expo build:web
web_build_return_code="$?"

echo "test-get.1-b.tc" > web-build/CNAME

exit "${web_build_return_code}"
