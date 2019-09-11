import EntityScanProperties from "./EntityScanProperties";

import WrappedAdvancedEntityOtherForm from '../../../../components/Form/EntityOtherForm';
import I18NUtils from "../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../api/const/i18n";
import TableManagerRequest from "../../../../api/table-manager/TableManagerRequest";

/**
 * 根据条件查找出一笔记录。 没有表格。直接显示详情信息
 * 此笔记录只具备查看功能
 */
export default class EntityViewProperties extends EntityScanProperties{

    static displayName = 'EntityViewProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{searchTxt: I18NUtils.getClientMessage(i18NCode.BtnSearch), formObject: {}}};
    }

    queryData = (whereClause) => {
        const self = this;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            if (queryDatas && queryDatas.length > 0) {
                //TODO 此处为GC客制化
                // queryDatas[0].printNumber = 2;
                self.setState({
                    formObject: queryDatas[0]
                })  
                self.form.resetFormFileds();
            } else {
                self.setState({
                    formObject: []
                })  
                self.showDataNotFound();
            }
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
        
    }

    getFields(fields) {
        
    }

    createButtonGroup = () => {

    }
    
    buildOtherComponent = () => {
        return (<div>
                    <div style={styles.buttonGroup}>
                        {this.createButtonGroup()}
                    </div>
                    <WrappedAdvancedEntityOtherForm object={this.state.formObject} table={this.state.table}></WrappedAdvancedEntityOtherForm>
                </div>);
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    },
    buttonGroup:{
        marginBottom:'10px',
        marginRight:'30px',
        textAlign:'right'
    }
};