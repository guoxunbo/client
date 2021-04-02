import EntityViewProperties from "./entityProperties/EntityViewProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import { Button } from "antd";
import IconUtils from "../../../api/utils/IconUtils";
import { DefaultRowKey } from "../../../api/const/ConstDefine";
import { Notification } from "../../../components/notice/Notice";
import MaterialLotUpdateRequest from "../../../api/gc/materialLot-update-manager/MaterialLotUpdateRequest";
import PropertyUtils from "../../../api/utils/PropertyUtils";
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
/**
 * 修改LOT信息
 */
export default class GCUpdateMLotInfoProperties extends EntityViewProperties{

    static displayName = 'PrintCaseLabelProperties';

    resetData = () => {
      let self = this;
      self.entityForm.clearField();
      self.entityForm.resetFields();
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true,
          formObject: []
        });
      }
    
    queryData = (whereClause) => {
        const self = this;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            if (queryDatas && queryDatas.length > 0) {
                self.setState({
                    formObject: queryDatas[0],
                    loading: false,
                })  
                self.form.resetFormFileds();
            } else {
                self.setState({
                    formObject: [],
                    loading: false,
                })  
                self.showDataNotFound();
            }
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }


    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createUpdateButton());
        return buttons;
    }

    handleUpdate = () => {
        let self = this;
        let materialLotRrn = self.state.formObject[DefaultRowKey];
        if (!materialLotRrn) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        const form = self.entityForm;
        form.validateFields((err, values) => {
          if (err) {
              return;
          }
          let formObject = self.state.formObject;
          PropertyUtils.copyProperties(values, formObject);
          let materialLot = formObject;
          self.updateLotInfo(materialLot);
      });
    }
    
    updateLotInfo = (materialLot) => {
      let self = this;
      self.setState({
        loading: true
      });
      EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
      
      let requestObject = {
          materialLot: materialLot,
          success: function(responseBody) {
            self.resetData();
            self.entityForm.clearField();
            self.entityForm.resetFields();
            MessageUtils.showOperationSuccess();
          }
      };
      MaterialLotUpdateRequest.sendUpdateLotInfoRequest(requestObject);
  }

    createUpdateButton = () => {
        return <Button key="update" type="primary" loading={this.state.loading} onClick={() => this.handleUpdate()}>
             {IconUtils.buildIcon("edit")}{I18NUtils.getClientMessage(i18NCode.BtnUpdate)}</Button>;
    }
    
}

const styles = {
    buttonGroup:{
        marginBottom:'10px',
        marginRight:'30px',
        textAlign:'right'
    }
};