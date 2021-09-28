import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import MobileForm from "@components/framework/form/MobileForm";
import SqlUtils from "@components/framework/utils/SqlUtils";
import { DateFormatType } from "@const/ConstDefine";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Form } from "antd";
import moment from 'moment';

export default class UpdateMLotForm extends MobileForm {

    static displayName = 'UpdateMLotForm';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{queryFields:[]}, formObject:{} };
    }

    customFieldEnterEvent = (queryField, fieldEnterEvents) => {
        if (queryField.name == "materialLotId") {
            fieldEnterEvents[queryField.name] = this.handleSearch;
        }
    }

    onLastFieldEnter = () => {
        
    } 
    
    handleSearch = () => {
        var self = this;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.productionDate = undefined;
            let whereClause = SqlUtils.buildWhereClause(this.state.queryFields, values);
            let requestObject = {
                tableRrn: this.state.tableRrn,
                whereClause: whereClause,
                success: function(responseBody) {
                  self.afterQuery(responseBody);
                }
              }
              TableManagerRequest.sendGetDataByRrnRequest(requestObject);
        });
    }

    afterQuery = (responseBody) => {
        let materialLot = responseBody.dataList[0];
        if (materialLot) {
            this.setState({
                formObject: materialLot
            })
            if(materialLot.productionDate){
                materialLot.productionDate = moment(materialLot.productionDate, DateFormatType.Date)
            }else{
                materialLot.productionDate = null;
            }
            this.props.form.setFieldsValue(materialLot);
        } else {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
            this.resetFormFileds();
        }
    }

}

const WrappedUpdateMLotForm = Form.create()(UpdateMLotForm);
export {WrappedUpdateMLotForm};