import { MMExtensionContext } from "../pluginInterface";
import MainWindow from "./MainWindow/MainWindow";

export function activate(context: MMExtensionContext) {
    context.registerPlugin({
        type: 'MainWindow',
        name: 'MainWindow',
        label: 'Main Window',
        component: MainWindow
    })
}