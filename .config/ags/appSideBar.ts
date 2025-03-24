import { App } from "astal/gtk3"
import style from "./widget/stylewidget/appSideBar.scss"
import SideBar from "./widget/SideBar"

App.add_icons("./assets")

App.start({
    css: style,
    instanceName: "sidebar",
    iconTheme: "Papirus",
    requestHandler(request, res) {
        print(request)
        res("ok")
    },
    main: () => {//App.get_monitors().map(Bar, CornerScreen)
        SideBar()
    },
})