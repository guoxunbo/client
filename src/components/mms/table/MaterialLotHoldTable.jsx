import EntityListTable from "@components/framework/table/EntityListTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Button, Input } from "antd";
import MaterialLotHoldDialog from "../dialog/MaterialLotHoldDialog";

export default class MaterialLotHoldTable extends EntityListTable{

    static displayName = 'MaterialLotHoldTable' ;

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
    }

    constructor(props){
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createHoldButton());
        return buttons;
    }

    buildOperationColumn =()=>{

    }

    createHoldButton =()=>{
        return <Button key="release" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.HoldMLot}>
                        {I18NUtils.getClientMessage(i18NCode.BtnHold)}
                    </Button>
    }

    selectRow = (record) => {
        let rowKey = this.props.rowKey || DefaultRowKey;
        const selectedRowKeys = [...this.state.selectedRowKeys];
        const selectedRows = [...this.state.selectedRows];

        let checkIndex = selectedRowKeys.indexOf(record[rowKey]);
        if (checkIndex >= 0) {
            selectedRowKeys.splice(checkIndex, 1);
            selectedRows.splice(checkIndex, 1);
        } else {
            selectedRowKeys.push(record[rowKey]);
            selectedRows.push(record);
        }
        this.setState({ 
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
        });
    }

    
    HoldMLot =() => {
        let self = this;
        let actionTable = self.props.holdActionTable;
        let waitHoldMaterialLots = self.getSelectedRows();
        if(waitHoldMaterialLots.length === 0){
            return;
        }
        this.setState({
            formVisible: true,
            formObject: waitHoldMaterialLots,
            holdActionTable : actionTable
        });
    }

    createForm = () => {
        return  <MaterialLotHoldDialog key={MaterialLotHoldDialog.displayName} ref={this.formRef} object={this.state.formObject} visible={this.state.formVisible} 
                                            table={this.state.holdActionTable} onOk={this.refresh} onCancel={this.handleCancel} />
    }

    refresh = (data) => {
        this.setState({
            formObject: [],
            formVisible: false
        });
        this.props.resetData();
        NoticeUtils.showSuccess();
    }

    handleCancel = () => {
        this.setState({
            formVisible: false
        });
    }
}
const styles = {
    input: {
        width: 200,
        marginLeft:'20px'
    },
    tableButton: {
        marginLeft:'20px'
    }
};