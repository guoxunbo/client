import EntityListTable from "@components/framework/table/EntityListTable";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import TableUtils from "@components/framework/utils/TableUtils";
import { SqlType } from "@const/ConstDefine";
import { Button } from "antd";
import NoticeUtils from '@utils/NoticeUtils';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import TableObject from '@api/dto/ui/Table';
import VcCreateOrderDialog from "../dialog/VcCreateOrderDialog";
import { CreateDocType } from "../dialog/VcCreateOrderDialog";

/**
 * 页面创建单据
 */
export default class VcCreateOrderLineTable extends EntityListTable {

    static displayName = 'VcCreateOrderLineTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{formTable: {fields: []}}};
    }

    componentWillReceiveProps = (props) => {
        const {whereClause} = props;
        if (whereClause === SqlType.NoResultCondition) {
            return;
        }
        if (whereClause === this.props.whereClause) {
            return;
        }
        const self = this;
        let requestObject = {
            tableName: this.props.refTableName,
            whereClause: whereClause,
            success: function(responseBody) {
                self.setState({
                    data: responseBody.dataList,
                });
            }
        }
        TableManagerRequest.sendGetDataByNameRequest(requestObject);
    }
        
    componentDidMount = () => {
        TableUtils.initTable(this, SqlType.NoResultCondition, this.props.refTableName);
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(<Button key="add" disabled={this.state.parentReadOnly} style={{marginRight:'1px', marginLeft:'10px'}} size="small" icon="plus" onClick={() => this.handleAdd()}  href="javascript:;">{I18NUtils.getClientMessage(i18NCode.BtnAdd)}</Button>);
        return buttons;
    }

    handleEdit = (record) => {
        this.handleAdd(record);
    }

    handleAdd = (record) => {
        let self = this;
        let requestObject = {
            tableRrn: self.state.table.objectRrn,
            success: function(responseBody) {
                let table = responseBody.table;
                let editorObject = record ? record : TableObject.buildDefaultModel(table.fields, self.props.parentObject);
                self.setState({
                    table: responseBody.table,
                    editorObject: editorObject,
                    formVisible : true
                });
            }
        }
        TableManagerRequest.sendGetByRrnRequest(requestObject);
    }

    createForm = () => {
        return  <VcCreateOrderDialog ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} 
                                            docType = {CreateDocType.documentLine}/>
    }
}