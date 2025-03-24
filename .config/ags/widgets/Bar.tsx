import { App } from "astal/gtk3"
import { Variable, GLib, bind } from "astal"
import { Astal, Gtk, Gdk } from "astal/gtk3"
import { subprocess, exec, execAsync } from "astal/process"
import Hyprland from "gi://AstalHyprland"
import Wp from "gi://AstalWp"
import Network from "gi://AstalNetwork"
import Tray from "gi://AstalTray"
import Revealer from "./Revealer"


const artist = Variable("").poll(1000, ["bash", "-c", "~/.config/ags/scripts/music.sh getartist"])
const title = Variable("").poll(1000, ["bash", "-c", "~/.config/ags/scripts/music.sh gettitle"])
const iconApp = Variable("").poll(1000, ["bash", "-c", "~/.config/ags/scripts/music.sh geticon"])

const percentageBattery = Variable("").poll(1000, ["bash", "-c", "~/.config/ags/scripts/battery-info.sh getpercentage"])
const iconBattery = Variable("").poll(1000, ["bash", "-c", "~/.config/ags/scripts/battery-info.sh geticon"])
const date = Variable("").poll(1000, ["bash", "-c", 'date "+%H:%M"'])
const point = Variable(" · ")
const calendar = Variable("").poll(1000, ["bash", "-c", 'date "+%A, %d/%m"'])
const iconWifi = Variable("").poll(1000, ["bash", "-c", "~/.config/ags/scripts/network-info.sh geticon"])
const iconBluetooth = Variable("").poll(1000, ["bash", "-c", "~/.config/ags/scripts/bluetooth-info.sh geticon"])

function Clock() {
    return <box className="clock">
        <label className="clock-time" label={bind(date)} />
        <label className="clock-point" label={bind(point)} />
        <label className="clock-calendar" label={bind(calendar)} />
    </box>
}

function BatteryHealth() {
    return <box className="battery-box">
        <icon
            className="battery-box-btn-icon"
            icon={bind(iconBattery)}
        />
        <label label=" " />
        <label label={bind(percentageBattery)} />
    </box>
}

function MenuShortcuts() {
    return <box className="menu-shortcuts">
        <button className="menu-shortcuts-btn" cursor="pointer" onClicked={
            () => {
                execAsync(["bash", "-c", "whoami"])
                    .then((out) => console.log(out))
                    .catch((err) => console.error(err))
            }
        } >
            <icon
                className="menu-shortcuts-btn-icon"
                icon="org.flameshot.Flameshot"
            />
        </button>
        <button className="menu-shortcuts-btn" cursor="pointer" onClicked={
            () => {
                execAsync(["bash", "-c", "hyprpicker -f hex | cat | wl-copy"])
                    .then((out) => console.log(out))
                    .catch((err) => console.error(err))
            }
        } >
            <icon
                className="menu-shortcuts-btn-icon"
                icon="color-picker-2"
            />
        </button>
        <button className="menu-shortcuts-btn" cursor="pointer" onClicked={
            () => {
                execAsync(["bash", "-c", "whoami"])
                    .then((out) => console.log(out))
                    .catch((err) => console.error(err))
            }
        } >
            <icon
                className="menu-shortcuts-btn-icon"
                icon="input-keyboard-symbolic"
            />
        </button>
    </box>
}
function AppLauncher() {
    return <box className="app-launcher-box" homogeneus={false} vertical={true}>
        <button className="app-launcher-btn" halign={Gtk.Align.START} cursor="pointer" onClicked={
            () => {
                execAsync(["bash", "-c", "bash ~/.config/ags/launch.sh launchmusic"])
                .then((out) => console.log(out))
                .catch((err) => console.error(err))
            }
        } >
            <Media />
        </button>

        <button className="app-launcher-btn" halign={Gtk.Align.START} cursor="pointer" onClicked={
            () => {
            execAsync(["bash", "-c", "bash ~/.config/rofi/launcher/launch.sh"])
                .then((out) => console.log(out))
                .catch((err) => console.error(err))
            }
        } >
            Apps
        </button>
    </box>
}

function Menu() {
    return <box className="menu-box">
        <button className="menu-btn" cursor="pointer" onClicked={
            () => {
                execAsync(["bash", "-c", "whoami"])
                    .then((out) => console.log(out))
                    .catch((err) => console.error(err))
            }
        } >
            <icon
                className="menu-shortcuts-btn-icon"
                icon={bind(iconWifi)}
            />
        </button>
        <button className="menu-btn" cursor="pointer" onClicked={
            () => {
                execAsync(["bash", "-c", "hyprpicker -f hex | cat | wl-copy"])
                    .then((out) => console.log(out))
                    .catch((err) => console.error(err))
            }
        } >
            <icon
                className="menu-shortcuts-btn-icon"
                icon={bind(iconBluetooth)}
            />
        </button>
        <button className="menu-btn" cursor="pointer" onClicked={
            () => {
                execAsync(["bash", "-c", "bash ~/.config/ags/launch.sh launchsidebar"])
                .then((out) => console.log(out))
                .catch((err) => console.error(err))
            }
        } >
            <icon
                className="menu-shortcuts-btn-icon"
                icon="notification-indicator-normal"
            />
        </button>
    </box>
}


function SysTray() {
    const tray = Tray.get_default()

    return <box className="SysTray">
        {bind(tray, "items").as(items => items.map(item => (
            <menubutton
                tooltipMarkup={bind(item, "tooltipMarkup")}
                usePopover={false}
                actionGroup={bind(item, "actionGroup").as(ag => ["dbusmenu", ag])}
                menuModel={bind(item, "menuModel")}>
                <icon gicon={bind(item, "gicon")} />
            </menubutton>
        )))}
    </box>
}

function Media() {

    return <box className="media">
        <label label={bind(title)} />
        <label label={bind(point)} />
        <label label={bind(artist)} />
        <icon
            className="media-icon"
            icon={bind(iconApp)}
        />

    </box>
}

function Workspaces() {
    const hypr = Hyprland.get_default()

    return <box className="workspaces">
        {bind(hypr, "workspaces").as(wss => wss
            .filter(ws => !(ws.id >= -99 && ws.id <= -2)) // filter out special workspaces
            .sort((a, b) => a.id - b.id)
            .map(ws => (
                <button
                    className={bind(hypr, "focusedWorkspace").as(fw =>
                        ws === fw ? "focused" : "")}
                    onClicked={() => ws.focus()}>
                    {ws.id}
                </button>
            ))
        )}
    </box>
}



export default function Bar(monitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
    const visibleSideBar = Variable(false)

    return <window
        className="bar"
        gdkmonitor={monitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        iconTheme="Papirus"
        
        >
        <centerbox>
            <box hexpand halign={Gtk.Align.START}>
                <AppLauncher />
                <Workspaces />
            </box>
            <box>
                <MenuShortcuts />
                <Clock />
                <BatteryHealth />
            </box>
            <box hexpand halign={Gtk.Align.END} >
                <Menu />
            </box>
        </centerbox>
    </window>
}
