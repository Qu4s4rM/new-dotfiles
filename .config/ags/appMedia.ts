import { App } from "astal/gtk3"
import style from "./widget/stylewidget/appMedia.scss"
import ScreenMedia from "./widget/Media"

App.add_icons("./assets")

App.start({
    css: style,
    instanceName: "media",
    iconTheme: "Papirus",
    requestHandler(request, res) {
        print(request)
        res("ok")
    },
    main: () => {//App.get_monitors().map(Bar, CornerScreen)
        ScreenMedia()
    },
})