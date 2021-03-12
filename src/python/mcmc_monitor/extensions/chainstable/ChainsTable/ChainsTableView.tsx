import { FunctionComponent } from "react";
import { RunViewProps } from "../../pluginInterface/RunViewPlugin";
import ChainsTable from "./ChainsTable";

const ChainsTableView: FunctionComponent<RunViewProps> = ({ run, iterations, runSelection, runSelectionDispatch }) => {
    return (
        <ChainsTable
            iterations={iterations || []}
            runSelection={runSelection}
            runSelectionDispatch={runSelectionDispatch}
        />
    )
}

export default ChainsTableView