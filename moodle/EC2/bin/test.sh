#!/bin/bash -xe

#
# to install packages from open repositories
# 
install_package(){
    wget -O /tmp/$1.tgz $2
    MOODLE_BASE=/var/www/moodle/html
    DIR=${MOODLE_BASE}/$3
    if [ ! -d "$DIR" ]; then
        mkdir -p ${DIR}
    fi
    tar -xvzf /tmp/$1.tgz --strip-components=1 -C ${DIR}
}

install_package moodle https://github.com/moodle/moodle/archive/v3.8.1.tar.gz ''
install_package theme1 https://github.com/moodleuulm/moodle-theme_boost_campus/archive/v3.7-r4.tar.gz theme/boost_campus