// !begin-code-generation!
import { activate as activatechainstable } from './python/mcmc_monitor/extensions/chainstable/chainstable'
import { activate as activateiterationsplot } from './python/mcmc_monitor/extensions/iterationsplot/iterationsplot'
import { activate as activateiterationstable } from './python/mcmc_monitor/extensions/iterationstable/iterationstable'
import { activate as activatemainwindow } from './python/mcmc_monitor/extensions/mainwindow/mainwindow'
// !end-code-generation!
/*
Extensions are automatically detected and added to this file via code generation (see task configured in vscode)
They must be .tsx files with the following appearing at the top of the file
// LABBOX-EXTENSION: <name>
And they must include an activate() function
Use the following to also include the extension in the jupyterlab extension:
// LABBOX-EXTENSION-TAGS: jupyter
*/
import { MMExtensionContext } from './python/mcmc_monitor/extensions/pluginInterface'
import { activate as activateworkspaceview } from './python/mcmc_monitor/extensions/workspaceview/workspaceview'
const registerExtensions = (context: MMExtensionContext) => {
    // !begin-code-generation!
    activatemainwindow(context)
    activateworkspaceview(context)
    activatechainstable(context)
    activateiterationstable(context)
    activateiterationsplot(context)
    // !end-code-generation!
}

export default registerExtensions

// !note! This file involves code generation.
// !note! The following template file was used: ./src/registerExtensions.ts.j2
// !note! You may edit the generated file outside of the code-generation blocks.
// !note! Changes to the generated file will be updated in the template file.
// !note! If vscode automatically moves the code-generation block delimiters upon save, just manually move them back and re-save
