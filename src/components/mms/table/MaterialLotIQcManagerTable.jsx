import EntityListTable from "@components/framework/table/EntityListTable";
import EventUtils from "@utils/EventUtils";

export default class MaterialLotIQcManagerTable extends EntityListTable{

    static displayName = 'MaterialLotIQcManagerTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    buildOperationColumn = () => {
        
    }

    createButtonGroup = () => {
        
    }

    selectRow = (record) => {
        let selectedRows = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        // 发送事件变化
        EventUtils.getEventEmitter().emit(EventUtils.getEventNames().ParentTableRowSelected, this, record, this.props.rowKey);

        let whereClause = "materialLotId ="+" '" +record.materialLotId+"' ";
        this.props.materialLotQc.queryData(whereClause);
    }

    getRowClassName = (record, index) => {
        const {selectedRows} = this.state;
        if (selectedRows.indexOf(record) >= 0) {
            return 'scaned-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };
}