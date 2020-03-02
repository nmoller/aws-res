

# from: https://github.com/moodlehq/moodle-ci-runner/blob/master/runner/master/run.sh
# for each plugin: gitrepo, folder and branch (optional). The plugin fields should be separated by "|" and each plugin should
# be separated using ";": "gitrepoplugin1|gitfolderplugin1|gitbranchplugin1;gitrepoplugin2|gitfolderplugin2|gitbranchplugin2[...]"
# Example: "https://github.com/moodlehq/moodle-local_mobile.git|local/mobile|MOODLE_37_STABLE;git@github.com:jleyva/moodle-block_configurablereports.git|blocks/configurable_reports"
 
# Download all the plugins in a temporary folder.
IFS=';' read -ra PLUGINS <<< "$PLUGINSTOINSTALL"
for PLUGIN in "${PLUGINS[@]}";
do
if  [ -n "$PLUGIN" ]
then
    PLUGINGITREPO=$(echo "$PLUGIN" | cut -f1 -d'|')
    PLUGINFOLDER=$(echo "$PLUGIN" | cut -f2 -d'|')
    PLUGINBRANCH=$(echo "$PLUGIN" | cut -f3 -d'|')

    if [ -n "${PLUGINBRANCH}" ]
    then
    # Only download this branch.
    PLUGINBRANCH="-b ${PLUGINBRANCH} --single-branch"
    fi

    # Clone the plugin repository in the defined folder.
    git clone ${PLUGINBRANCH} ${PLUGINGITREPO} "${PLUGINSDIR}/${PLUGINFOLDER}"
    echo
fi
done
unset IFS