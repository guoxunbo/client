import VcApproveDocumentTable from "@components/vc/table/VcApproveDocumentTable";
import EntityProperties from "../framework/EntityProperties";

export default class VcApproveDocumentProperties extends EntityProperties{

    static displayName =  'VcApproveDocumentProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    buildTable = () => {
        return (<VcApproveDocumentTable
                {...this.getDefaultTableProps()} />)
    }
   
}
