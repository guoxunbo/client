import EntityViewProperties from "./entityProperties/EntityViewProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import { Button } from "antd";
import IconUtils from "../../../api/utils/IconUtils";

/**
 * 打印箱标签
 */
export default class GcPrintCaseLabelProperties extends EntityViewProperties{

    static displayName = 'PrintCaseLabelProperties';
    
    queryData = (whereClause) => {
        const self = this;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            if (queryDatas && queryDatas.length > 0) {
                queryDatas[0].printNumber = 2;
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


    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPrintButton());
        return buttons;
    }

    handlePrint = () => {
        //TODO 调用bartender打印
        console.log(this.state.formObject);
    }

    createPrintButton = () => {
        return <Button key="print" type="primary" onClick={() => this.handlePrint()}>
             {IconUtils.buildIcon("icon-barcode")}{I18NUtils.getClientMessage(i18NCode.BtnPrint)}</Button>;

    }
    
}

const styles = {
    buttonGroup:{
        marginBottom:'10px',
        marginRight:'30px',
        textAlign:'right'
    }
};