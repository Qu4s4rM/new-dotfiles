import { App } from "astal/gtk3"
import { Variable, GLib, bind } from "astal"
import { Astal, Gtk, Gdk } from "astal/gtk3"
import { subprocess, exec, execAsync } from "astal/process"


function OnScreenSideBar() {

    return (
        <centerbox className="sidebar-box">
            <label label="Hello" />
            <label label="Hello" />
            <label label="Hello" />
            <label label="Hello" />
            <label label="Hello" />
            <label label="Hello" />
            <label label="Hello" />
            <label label="Hello" />
        </centerbox>
    )
}

export default function SideBar(monitor: Gdk.Monitor) {
    const { TOP, RIGHT, BOTTOM } = Astal.WindowAnchor

    return <window
        className="sidebar"
        gdkmonitor={monitor}
        exclusivity={Astal.Exclusivity.NORMAL}
        anchor={TOP | RIGHT | BOTTOM}
        iconTheme="Papirus"
        keymode={Astal.Keymode.ON_DEMAND}
        onKeyPressEvent={(self, event: Gdk.Event) => {
            if (event.get_keyval()[1] === Gdk.KEY_Escape) {
                self.hide()
            }
        }}
        marginTop="12"
        marginRight="12"
        marginBottom="12"
        >
        <OnScreenSideBar />
    </window>
}
