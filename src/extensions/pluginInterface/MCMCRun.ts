export type MCMCIteration = {
    timestamp: number
    parameters: {[key: string]: number}
}

export type MCMCRun = {
    iterations: MCMCIteration
}