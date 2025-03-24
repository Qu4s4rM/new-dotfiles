import Variable from "astal/variable"
import { Astal, Gtk } from "astal/gtk3"
import { bind } from "astal"




const hour = Variable("").poll(1000, ["bash", "-c", 'date "+%H"'])
const min = Variable("").poll(1000, ["bash", "-c", 'date "+%M"'])
const sec = Variable("").poll(1000, ["bash", "-c", 'date "+%S"'])
const nameDay = Variable("").poll(1000, ["bash", "-c", 'date "+%A"'])
const year = Variable("").poll(1000, ["bash", "-c", 'date "+%Y"'])
const day = Variable("").poll(1000, ["bash", "-c", 'date "+%d"'])
const month = Variable("").poll(1000, ["bash", "-c", 'date "+%B"'])


function Hour() {
    return <box className="hour">
        <label label={bind(hour)} />
    </box>
}
function Min() {
    return <box className="min">
        <label label=":" />
        <label label={bind(min)} />
        <label label=":" />
    </box>
}
function Sec() {
    return <box className="sec">
        <label label={bind(sec)} />
    </box>
}
function NameDay() {
    return <box className="name-day" halign={Gtk.Align.CENTER}>
        <label label={bind(nameDay)} />
    </box>
}
function Year() {
    return <box className="year" halign={Gtk.Align.END}>
        <label label={bind(year)} />
    </box>
}
function Day() {
    return <box className="day" halign={Gtk.Align.START}>
        <label label={bind(day)}/>
    </box>
}
function Month() {
    return <box className="month" halign={Gtk.Align.CENTER}>
        <label label={bind(month)} />
        <label label="," />
    </box>
}


function OnScreenClock() {

    return (
        <centerbox className="time-box" vertical>
            <NameDay />
            <centerbox className="date-time">
                <Day />
                <Month />
                <Year />
            </centerbox>
            <centerbox className="date-time-hours">
                <Hour />
                <Min />
                <Sec />
            </centerbox>
        </centerbox>
    )
}

export default function Time(monitor: Gdk.Monitor) {
    const {TOP,  BOTTOM} = Astal.WindowAnchor

    return (
        <window
            gdkmonitor={monitor}
            className="time"
            namespace="TIME"
            layer={Astal.Layer.BACKGROUND}
            exclusivity={Astal.Exclusivity.IGNORE}
            anchor={TOP | BOTTOM}
            iconTheme="Papirus"
            marginTop="200"
            marginBottom="450"
        >
            <OnScreenClock />
        </window>
    )
}
