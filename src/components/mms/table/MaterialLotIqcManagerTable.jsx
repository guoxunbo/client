import EntityListCheckTable from "@components/framework/table/EntityListCheckTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import { Button, Tag } from "antd";
import { DefaultRowKey } from "@api/const/ConstDefine";
import MLotBatchJudgeIqcDialog from "../dialog/MLotBatchJudgeIqcDialog";
import NoticeUtils from "@utils/NoticeUtils";
import { Application } from "@api/Application";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";

/**
 * 带有选择框的table
 * 选择框点击不处理
 */
export default class MaterialLotIqcManagerTable extends EntityListCheckTable{

    static displayName = 'MaterialLotIqcManagerTable';

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

    buildOperationColumn = () => {
        
    }

    getRowSelection = (selectedRowKeys) => {
        const rowSelection = {
            columnWidth: Application.table.checkBox.width,
            fixed: false,
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                //让选择框失效
                // this.setState({
                //     selectedRowKeys: selectedRowKeys,
                //     selectedRows: selectedRows
                // })
            },
        }
        return rowSelection;
    }

    selectRow = (record, selectFlag) => {
        let whereClause = "materialLotId ="+" '" +record.materialLotId+"' ";
        this.props.materialLotQc.queryData(whereClause);

        if(selectFlag == undefined){selectFlag = false;}
        if(this.mainMaterialFlag(record) && !selectFlag){
            return;
        }

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

    //主材标识
    mainMaterialFlag = (mLot) =>{
        return mLot.materialCategory == 'MainMaterial';
    }

    getSelectedRowsTotalQty =()=>{
        let totalQty = 0;
        if(this.state.selectedRows == []){
            return totalQty;
        }
        let data = this.state.selectedRows;
        data.forEach(d => {
            totalQty = totalQty + d.currentQty
        });
        return totalQty;
    }

    createButtonGroup = () => {
        let btns = [];
        btns.push(<Tag color="#2db7f5" >{I18NUtils.getClientMessage(i18NCode.ScannedQty)}：{this.state.selectedRows.length} </Tag>);      

        btns.push(<Tag color="#2db7f5" >{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{this.getSelectedRowsTotalQty()}</Tag>);      

        btns.push(<Button key="bathchJudge" type="primary" className="table-button" icon="judge" onClick={this.handleJudge}>
                        {I18NUtils.getClientMessage(i18NCode.BtnBathchJudge)}
                    </Button>);
        return btns;
    }

    createForm = () => {
        return  <MLotBatchJudgeIqcDialog key={MLotBatchJudgeIqcDialog.displayName} ref={this.formRef} object={this.state.formObject} visible={this.state.formVisible} 
                                            table={this.state.actionTable} onOk={this.refresh} onCancel={this.handleCancel} />
    }

    handleJudge = () => {
        let self = this;
        let formObject = self.getSelectedRows();
        if(formObject.length == 0){
            return;
        }
        let actionTable = self.props.actionTable;
        if(actionTable){
            let object = {
                tableRrn: actionTable.objectRrn,
                success: function(responseBody){
                    self.setState({
                        formVisible: true ,
                        actionTable: responseBody.table,
                        formObject: formObject,
                    });
                }
            }
            TableManagerRequest.sendGetByRrnRequest(object);
        }

        // this.setState({
        //     formVisible: true ,
        //     actionTable: self.props.actionTable,
        //     formObject: formObject,
        // });
    }

    refresh = (data) => {
        this.setState({
            formObject: [],
            data:[],
            selectedRowKeys: [],
            selectedRows: [],
            formVisible: false,
        });
        NoticeUtils.showSuccess();
    }

    handleCancel = () => {
        this.setState({
            formVisible: false
        });
    }
}