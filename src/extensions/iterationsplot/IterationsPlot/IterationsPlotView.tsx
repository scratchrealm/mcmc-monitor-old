import { FunctionComponent, useMemo } from "react";
import Expandable from "../../common/Expandable";
import { Iteration } from "../../pluginInterface";
import { RunViewProps } from "../../pluginInterface/RunViewPlugin";
import IterationsPlot from "./IterationsPlot";

const IterationsPlotView: FunctionComponent<RunViewProps> = ({ run, iterations }) => {
    const chains = useMemo((): {chainId: number, iterations: Iteration[]}[] => {
        const x: {[key: string]: {iterations: Iteration[]}} = {}
        ;(iterations || []).forEach((it: Iteration) => {
            const chainId = it.chainId
            if ((chainId + '') in x) {
                x[chainId + ''].iterations.push(it)
            }
            else {
                x[chainId + ''] = {iterations: []}
            }
        })
        const chainIds = Object.keys(x).sort().map(k => Number(k))
        return chainIds.map(chainId => ({
            chainId,
            ...x[chainId + '']
        }))
    }, [iterations])
    return (
        <div>
            {
                chains.map(chain => (
                    <Expandable label={`Iterations plot for chain ${chain.chainId}`} unmountOnExit={true}>
                        <div>
                            <IterationsPlot
                                iterations={chain.iterations}
                                paramKey={'theta'}
                                markerColor={'darkgreen'}
                            />
                            <IterationsPlot
                                iterations={chain.iterations}
                                paramKey={'lp__'}
                                markerColor={'darkblue'}
                            />
                        </div>
                    </Expandable>
                ))
            }
        </div>
    )
}

export default IterationsPlotView