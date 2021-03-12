import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { Iteration } from '../../pluginInterface';
import { RunSelection, RunSelectionDispatch } from '../../pluginInterface/RunSelection';
import RadioChoices from './RadioChoices';

type Props = {
    runSelection: RunSelection
    runSelectionDispatch: RunSelectionDispatch
    iterations?: Iteration[]
}

const RunParameterSelector: FunctionComponent<Props> = ({iterations, runSelection, runSelectionDispatch}) => {
    const parameterNames = useMemo(() => {
        const pNames: string[] = []
        ;(iterations || []).forEach((it: Iteration) => {
            for (let k in it.parameters) {
                if (!pNames.includes(k)) pNames.push(k)
            }
        })
        pNames.sort()
        return pNames
    }, [iterations])
    const handleSetValue = useCallback((v: string) => {
        runSelectionDispatch({type: 'setSelectedParameterNames', selectedParameterNames: [v]})
    }, [runSelectionDispatch])
    if (parameterNames.length === 0) return <div>No parameters</div>
    return (
        <RadioChoices
            label="Select parameter to view"
            value={runSelection.selectedParameterNames[0] || ''}
            onSetValue={handleSetValue}
            options={parameterNames.map(pname => ({
                label: pname,
                value: pname
            }))}
        />
    )
}

export default RunParameterSelector