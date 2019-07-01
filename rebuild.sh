#!/usr/bin/bash
rm -rf dist.tar dist0626.tar
cnpm run build
tar -zcvf dist0626.tar dist



