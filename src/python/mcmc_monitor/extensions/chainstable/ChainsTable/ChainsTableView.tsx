import { FunctionComponent } from "react";
import { RunViewProps } from "../../pluginInterface/RunViewPlugin";
import ChainsTable from "./ChainsTable";

const ChainsTableView: FunctionComponent<RunViewProps> = ({ run, iterations }) => {
    return (
        <ChainsTable
            iterations={iterations || []}
        />
    )
}

export default ChainsTableView