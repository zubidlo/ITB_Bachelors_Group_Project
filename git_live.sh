#!/bin/sh
while true;
do
    clear
    git log \
    --graph \
    --all \
    --color \
    --date=short \
    -20 \
    --pretty=format:"%C(yellow)%h%x20%C(white)%cd%C(green)%d%C(reset)%x20%s%x20%C(bold)(%an)%Creset" |
    cat -
    sleep 15
done