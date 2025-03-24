import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widget/Bar"
import CornerScreen from "./widget/CornerScreen"
import OSD from "./widget/OSD"
import Time from "./widget/Time"

App.add_icons("./assets")

App.start({
    css: style,
    instanceName: "js",
    iconTheme: "Papirus",
    requestHandler(request, res) {
        print(request)
        res("ok")
    },
    main: () => {//App.get_monitors().map(Bar, CornerScreen)
        Bar()
        CornerScreen()
        OSD()
        Time()
    },
})