import { MMExtensionContext } from "../pluginInterface";
import IterationsPlotView from "./IterationsPlot/IterationsPlotView";

export function activate(context: MMExtensionContext) {
    context.registerPlugin({
        type: 'RunView',
        name: 'IterationsPlot',
        label: 'Iterations Plot',
        component: IterationsPlotView
    })
}