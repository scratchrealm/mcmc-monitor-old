// This file was automatically generated. Do not edit directly. See devel/templates.

import { MMExtensionContext } from './python/mcmc_monitor/extensions/pluginInterface'

////////////////////////////////////////////////////////////////////////////////////
// The list of extensions is configured in devel/code_generation.yaml
import { activate as activate_chainstable } from './python/mcmc_monitor/extensions/chainstable/chainstable'
import { activate as activate_iterationsplot } from './python/mcmc_monitor/extensions/iterationsplot/iterationsplot'
import { activate as activate_iterationstable } from './python/mcmc_monitor/extensions/iterationstable/iterationstable'
import { activate as activate_mainwindow } from './python/mcmc_monitor/extensions/mainwindow/mainwindow'
import { activate as activate_workspaceview } from './python/mcmc_monitor/extensions/workspaceview/workspaceview'
////////////////////////////////////////////////////////////////////////////////////

const registerExtensions = (context: MMExtensionContext) => {
    ////////////////////////////////////////////////////////////////////////////////
    // The list of extensions is configured in devel/code_generation.yaml
    activate_chainstable(context)
    activate_iterationsplot(context)
    activate_iterationstable(context)
    activate_mainwindow(context)
    activate_workspaceview(context)
    ////////////////////////////////////////////////////////////////////////////////
}

export default registerExtensions
