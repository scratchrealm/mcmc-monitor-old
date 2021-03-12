export type RunSelection = {
    selectedChainIds: number[]
    selectedParameterNames: string[]
}

export const initialRunSelection: RunSelection = {
    selectedChainIds: [],
    selectedParameterNames: []
}

export type SetSelectedChainIdsAction = {
    type: 'setSelectedChainIds'
    selectedChainIds: number[]
}

export type SetSelectedParameterNamesAction = {
    type: 'setSelectedParameterNames'
    selectedParameterNames: string[]
}

export type RunSelectionAction = SetSelectedChainIdsAction | SetSelectedParameterNamesAction

export type RunSelectionDispatch = (a: RunSelectionAction) => void

export const runSelectionReducer = (s: RunSelection, a: RunSelectionAction) => {
    switch (a.type) {
        case 'setSelectedChainIds': return {
            ...s,
            selectedChainIds: a.selectedChainIds
        }
        case 'setSelectedParameterNames': return {
            ...s,
            selectedParameterNames: a.selectedParameterNames
        }
        default: return s
    }
}