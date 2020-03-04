#!/bin/bash -e

function installer() {
    while IFS= read -r PLUGIN
    do
        PLUGINGITREPO=$(echo "$PLUGIN" | cut -f1 -d'|')
        PLUGINFOLDER=$(echo "$PLUGIN" | cut -f2 -d'|')
        PLUGINBRANCH=$(echo "$PLUGIN" | cut -f3 -d'|')

        if [ -n "${PLUGINBRANCH}" ]
        then
        # Only download this branch.
        PLUGINBRANCH="-b ${PLUGINBRANCH} --single-branch"
        fi

        # Clone the plugin repository in the defined folder.
        # ce n'est pas une action... on devrait ajouter git dans la machine.
        echo git clone ${PLUGINBRANCH} ${PLUGINGITREPO} "/var/www/html/moodle/${PLUGINFOLDER}"
    done < $1
}

installer "components.txt"