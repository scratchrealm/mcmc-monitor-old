import { MMExtensionContext } from "../pluginInterface";
import IterationsTableView from "./IterationsTable/IterationsTableView";

export function activate(context: MMExtensionContext) {
    context.registerPlugin({
        type: 'RunView',
        name: 'IterationsTable',
        label: 'Iterations Table',
        component: IterationsTableView
    })
}