import { FunctionComponent, useMemo } from "react";
import { ChartLabel, LineSeries, MarkSeries, XAxis, XYPlot, YAxis } from 'react-vis';
import 'react-vis/dist/style.css';
import { Iteration } from "../../pluginInterface";

type Props = {
    iterations: Iteration[]
    paramKey: string
    markerColor: string
}

const IterationsPlot: FunctionComponent<Props> = ({iterations, paramKey, markerColor}) => {
    const iteration0 = iterations[0]
    const parameterKeys = useMemo(() => {
        if (!iteration0) return []
        return Object.keys(iteration0.parameters || {})
    }, [iteration0])
    if (!parameterKeys.includes(paramKey)) return <div>Not found: {paramKey} <pre>{JSON.stringify(parameterKeys)}</pre></div>
    const values = iterations.map(it => it.parameters[paramKey])
    const valuesMean = onlineMean(values)
    const valuesStdev = onlineStdev(values)
    const data = values.map((v, ii) => ({
        x: ii,
        y: v
    }))
    const dataMean = valuesMean.map((v, ii) => ({
        x: ii,
        y: v
    }))
    const dataStdevPlus = valuesStdev.map((v, ii) => ({
        x: ii,
        y: valuesMean[ii] + v
    }))
    const dataStdevMinus = valuesStdev.map((v, ii) => ({
        x: ii,
        y: valuesMean[ii] - v
    }))
    return (
        <XYPlot
            margin={70}
            height={400}
            width={1000}
        >
            <LineSeries
                data={dataMean}
                stroke="blue"
            />
            <LineSeries
                data={dataStdevMinus}
                stroke="pink"
                strokeStyle="dashed"
            />
            <LineSeries
                data={dataStdevPlus}
                stroke="pink"
                strokeStyle="dashed"
            />
            <MarkSeries
                data={data}
                fill="none"
                stroke={markerColor}
                strokeWidth={1}
            />
            <ChartLabel
                text={`${paramKey} vs iteration`}
                xPercent={0.5}
                yPercent={-0.05}
            />
            
            <XAxis title="Iteration number" />
            <YAxis title={paramKey} />
        </XYPlot>
    )
}

const onlineMean = (x: number[]) => {
    const y = [...x]
    for (let i = 1; i < x.length; i++) {
        y[i] = y[i-1] + (x[i]- y[i-1]) / i
    }
    return y
}

const onlineVariance = (x: number[]) => {
    const y = onlineMean(x)
    const M = [...x]
    M[0] = 0
    for (let i = 1; i < x.length; i++) {
        M[i] = M[i-1] + (x[i] - y[i-1]) * (x[i] - y[i])
    }
    return M.map((a, ii) => (ii > 0) ? (a) / ii : 0)
}

const onlineStdev = (x: number[]) => {
    return onlineVariance(x).map(a => Math.sqrt(a))
}

export default IterationsPlot