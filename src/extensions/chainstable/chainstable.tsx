import { MMExtensionContext } from "../pluginInterface";
import ChainsTableView from "./ChainsTable/ChainsTableView";

export function activate(context: MMExtensionContext) {
    context.registerPlugin({
        type: 'RunView',
        name: 'ChainsTable',
        label: 'Chains Table',
        component: ChainsTableView
    })
}