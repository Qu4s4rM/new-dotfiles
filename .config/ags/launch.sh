#!/usr/bin/env bash

FILEVOL="$HOME/.cache/vol-ags.lock"
FILEMUSIC="$HOME/.cache/music-ags.lock"
FILEWIFI="$HOME/.cache/wifi-ags.lock"

function launch_vol {
    if [[ ! -f "$FILEVOL" ]]; then
        touch "$FILEVOL"
        ags --bus-name volume -c ~/.config/ags/configVol.js
    elif [[ -f "$FILEVOL" ]]; then
        ags -q --bus-name volume -c ~/.config/ags/configVol.js
        rm -rf "$FILEVOL"
    fi
}
function launch_music {
    ags quit -i media
    sleep 5 &
    ags run ~/.config/ags/appMedia.ts
    #rm -rf "$FILESIDEBAR"
    #if [[ ! -f "$FILEMUSIC" ]]; then
    #    touch "$FILEMUSIC"
    #    ags run ~/.config/ags/widget/appMedia.ts
    #elif [[ -f "$FILEMUSIC" ]]; then
    #    ags quit -i media
    #    rm -rf "$FILEMUSIC"
    #fi
}

function launch_sidebar {
    ags quit -i sidebar
    sleep 5 &
    ags run ~/.config/ags/appSideBar.ts
    
}
function launch_wifi {
    #rm -rf "$FILESIDEBAR"
    if [[ ! -f "$FILEWIFI" ]]; then
        touch "$FILEWIFI"
        ags --bus-name wifi -c ~/.config/ags/wifi.js
    elif [[ -f "$FILEWIFI" ]]; then
        ags -q --bus-name wifi -c ~/.config/ags/wifi.js
        rm -rf "$FILEWIFI"
    fi
}

case $1 in
	launchvol)
	launch_vol
	;;
    launchmusic)
    launch_music
	;;
    launchsidebar)
    launch_sidebar
	;;
    launchwifi)
    launch_wifi
    ;;
    launchwlogout)
    bash ~/.config/wlogout/launch.sh
    ;;
esac
