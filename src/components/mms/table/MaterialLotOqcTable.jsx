import EntityListTable from "@components/framework/table/EntityListTable";
import EventUtils from "@utils/EventUtils";

export default class MaterialLotOqcTable extends EntityListTable{

    static displayName = 'MaterialLotOqcTable';

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

        let whereClause = "boxMaterialLotId ="+" '" +record.materialLotId+"' ";
        this.props.mLotQcScanProperties.queryBoxMLotData(whereClause);

        let whereClause2 = "materialLotId ="+" '" +record.materialLotId+"' ";
        this.props.mLotQcScanProperties.mLotOqcProperties.queryData(whereClause2);
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