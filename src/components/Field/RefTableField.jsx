import RefTableManagerRequestBody from '../../api/ref-table-manager/RefTableManagerRequestBody';
import RefTableManagerRequestHeader from '../../api/ref-table-manager/RefTableManagerRequestHeader';
import {UrlConstant} from "../../api/const/ConstDefine";
import MessageUtils from "../../api/utils/MessageUtils";

import Request from '../../api/Request';
import Combox from './Combox';
import * as PropTypes from 'prop-types';
import Field, { DisplayType } from '../../api/dto/ui/Field';

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
                debugger;
                self.refTable = responseBody.referenceTable;
                let data = [];
                let textFileds = self.refTable.textField.split(",");
                responseBody.dataList.map(d => {
                    let displayValue = [];
                    //TODO 过滤掉重复值
                    textFileds.map(textField => {
                        displayValue.push(d[textField.trim()]);
                    });
                    let refData = {
                        key: d[self.refTable.keyField],
                        value: displayValue.join("/")
                    };
                    data.push(refData);
                }); 
                var hash = {};
                data = data.reduce(function(item, next) {
                    debugger;
                    hash[next.key] ? '' : hash[next.key] = true && item.push(next);
                    return item
                }, [])
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
        debugger;
        if(sender == this){
            return;
        }
        let senderField = null;
        if (sender instanceof Field ) {
            senderField = sender;
        } else {
            senderField = sender.props.field;
        }
        let refTable = this.refTable;
        if (senderField && refTable && refTable.whereClause) {
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
            // } else {
            //     this.setState({
            //         data: [],
            //     });
            }
        }
    }
}

RefTableField.prototypes = {
    field: PropTypes.object.isRequired
}