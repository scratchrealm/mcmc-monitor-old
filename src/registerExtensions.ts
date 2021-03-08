// This file was automatically generated. Do not edit directly.


import { MMExtensionContext } from './python/mcmc_monitor/extensions/pluginInterface'

const registerExtensions = async (context: MMExtensionContext) => {
    const {activate: activate_chainstable} = await import('./python/mcmc_monitor/extensions/chainstable/chainstable')
    activate_chainstable(context)
    const {activate: activate_iterationsplot} = await import('./python/mcmc_monitor/extensions/iterationsplot/iterationsplot')
    activate_iterationsplot(context)
    const {activate: activate_iterationstable} = await import('./python/mcmc_monitor/extensions/iterationstable/iterationstable')
    activate_iterationstable(context)
    const {activate: activate_mainwindow} = await import('./python/mcmc_monitor/extensions/mainwindow/mainwindow')
    activate_mainwindow(context)
    const {activate: activate_workspaceview} = await import('./python/mcmc_monitor/extensions/workspaceview/workspaceview')
    activate_workspaceview(context)
    }

export default registerExtensions