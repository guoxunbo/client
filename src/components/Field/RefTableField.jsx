import RefTableManagerRequestBody from '../../api/ref-table-manager/RefTableManagerRequestBody';
import RefTableManagerRequestHeader from '../../api/ref-table-manager/RefTableManagerRequestHeader';
import {UrlConstant} from "../../api/const/ConstDefine";
import MessageUtils from "../../api/utils/MessageUtils";

import Request from '../../api/Request';
import Combox from './Combox';
import * as PropTypes from 'prop-types';

export default class RefTableField extends Combox {

    static displayName = 'RefTableField';
    
    refTable;

    queryData = (parameters) => {
        let self = this;
        let field = self.props.field;
        let requestBody = RefTableManagerRequestBody.buildGetData(field.refTableName, parameters);
        let requestHeader = new RefTableManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.RefTableManagerUrl);
        let requestObject = {
            request: request,
            success: function(responseBody) {
                self.refTable = responseBody.referenceTable;
                let data = [];
                let textFileds = self.refTable.textField.split(",");
                responseBody.dataList.map(d => {
                    let displayValue = [];
                    textFileds.map(textField => {
                        displayValue.push(d[textField.trim()]);
                    });
                    let refData = {
                        key: d[self.refTable.keyField],
                        value: displayValue.join("/")
                    };
                    data.push(refData);
                }); 
                self.setState({
                    data: data,
                });
                if (parameters) {
                    
                }
            }
        }
        MessageUtils.sendRequest(requestObject);
    }

    valueChanged = (sender, value) => {
        let senderField = sender.props.field;
        if (sender instanceof RefTableField) {
            let refTable = this.refTable;
            if (refTable && refTable.whereClause) {
                let whereClause = refTable.whereClause;
                // 如果包含了parameter则替换
                if (whereClause.indexOf(":") != -1) {
                    whereClause = whereClause.formatValue(senderField.name, value);
                }
                // 替换之后之后如果还有:存在 则不进行queryData 
                if (whereClause.indexOf(":") == -1) { 
                    let parameters = {};
                    parameters[senderField.name] = value;
                    this.queryData(parameters);
                }
            }
        }
        
    }
}

RefTableField.prototypes = {
    field: PropTypes.object.isRequired
}