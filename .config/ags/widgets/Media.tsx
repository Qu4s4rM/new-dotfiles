import { timeout } from "astal/time"
import Variable from "astal/variable"
import { Astal, Gtk } from "astal/gtk3"
import { subprocess, exec, execAsync } from "astal/process"
import Mpris from "gi://AstalMpris"
import { bind } from "astal"




const artist = Variable("").poll(1000, ["bash", "-c", "~/.config/ags/scripts/music.sh getartist"])
const point = Variable(" · ")
const title = Variable("").poll(1000, ["bash", "-c", "~/.config/ags/scripts/music.sh gettitle"])
const iconApp = Variable("").poll(1000, ["bash", "-c", "~/.config/ags/scripts/music.sh geticon"])
const image = Variable("").poll(1000, ["bash", "-c", "~/.config/ags/scripts/music.sh getimage"])
const lengthMusic = Variable("").poll(1000, ["bash", "-c", "~/.config/ags/scripts/music.sh getlength"])
const position = Variable("").poll(1000, ["bash", "-c", "~/.config/ags/scripts/music.sh getposition"])

function lengthStr(length: number) {
    const min = Math.floor(length / 60)
    //const min = length < 1000000000 ? Math.floor(length / 6e+7) : length > 1000000000 && length < 10000000000 ? Math.floor(length / 6e+7) : "nothing"
    const sec = Math.floor(length % 60)
    const sec0 = sec < 10 ? "0" : ""
    return `${min}:${sec0}${sec}`
}
function lengthStrNormal(length: number) {
    const min = Math.floor(length / 60)
    const sec = Math.floor(length % 60)
    const sec0 = sec < 10 ? "0" : ""
    return `${min}:${sec0}${sec}`
}

function Media() {
    
    return <box className="media-box">
        <label label={bind(title)} />
        <label label={bind(point)} />
        <label label={bind(artist)} />
        <icon
            className="media-icon"
            icon={bind(iconApp)}
        />
    </box>
}
function CoverArt() {
    return <centerbox>
        <box className="cover-art" css={`background-image: url('${bind(image)}.jpeg')`} />
    </centerbox>
}
function Time() {
    return <centerbox>
        <label label={bind(position).as(lengthStrNormal)} />
        <slider 
            visible="true"
            //onDragged={({ value }) => bind(position) = value}
            value={bind(position).as(p => bind(lengthMusic) > 0
                ? p / bind(lengthMusic) : 0)}
        />
        {/*1
        <slider
                visible={bind(position).as(l => l > 0)}
                onDragged={({ value }) => bind(position) = value * bind(position)}
                value={bind(lengthMusic).as(p => bind(position) > 0
                    ? p / bind(position) : 0)}
        />
                */}
        <label label={bind(lengthMusic).as(l => l > 0 ? lengthStr(l) : "0:00")} />
    </centerbox>
}

function Control() {
    return <centerbox className="control">
        <button className="control-play" cursor="pointer" onClicked={
            () => {
                execAsync(["bash", "-c", "bash ~/.config/ags/scripts/music.sh previous"])
                    .then((out) => console.log(out))
                    .catch((err) => console.error(err))
            }
        } >
            <icon
                className="control-play-icon"
                icon="media-skip-backward-symbolic"
            />
        </button>
        <button className="control-play" cursor="pointer" onClicked={
            () => {
                execAsync(["bash", "-c", "bash ~/.config/ags/scripts/music.sh playorpause"])
                    .then((out) => console.log(out))
                    .catch((err) => console.error(err))
            }
        } >
            <icon
                className="control-play-icon"
                icon="media-playback-start-symbolic"
            />
        </button>
        <button className="control-play" cursor="pointer" onClicked={
            () => {
                execAsync(["bash", "-c", "bash ~/.config/ags/scripts/music.sh next"])
                    .then((out) => console.log(out))
                    .catch((err) => console.error(err))
            }
        } >
            <icon
                className="control-play-icon"
                icon="media-skip-forward-symbolic"
            />
        </button>

    </centerbox>
}


function OnScreenMedia({ visible }: { visible: Variable<boolean> }) {
    function show (self) {
        let count = 0
        if (self.revealChild === false) {
            visible.set(true)
            count++
            timeout(5000, () => {
                count--
                if (count === 0) visible.set(false)
                console.log("Sirviendo")
            })
        }
    }  

    return (
        <revealer
            setup={
                (self) => show(self)
            }
            revealChild={visible()}
            transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}>
            
            <box className="media-menu" vertical>
                <Media />
                <CoverArt />
                <Time />
                <Control />
            </box>
        </revealer>
    )
}

export default function ScreenMedia(monitor: Gdk.Monitor) {
    const {TOP, LEFT} = Astal.WindowAnchor
    const visible = Variable(false)

    return (
        <window
            gdkmonitor={monitor}
            className="media"
            namespace="MEDIA"
            keymode={Astal.Keymode.ON_DEMAND}
            exclusivity={Astal.Exclusivity.NORMAL}
            anchor={TOP | LEFT}
            iconTheme="Papirus"
            marginLeft="10"
            marginTop="10"
        >
            <eventbox onClick={() => 
                //execAsync(["bash", "-c", "bash ~/.config/ags/launch.sh launchmusic"])
                visible.set(false)
            }>
                <OnScreenMedia visible={visible} />
            </eventbox>  
        </window>
    )
}
