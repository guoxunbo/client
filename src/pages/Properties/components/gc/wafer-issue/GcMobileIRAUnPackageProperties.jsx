import MobileProperties from "../../mobile/MobileProperties";
import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MessageUtils from "../../../../../api/utils/MessageUtils";
import IraPackageRequest from "../../../../../api/gc/ira-package-manager/IraPackageRequest";
import EventUtils from "../../../../../api/utils/EventUtils";
import MobileIRAUnPackageTable from "../../../../../components/Table/gc/MobileIRAUnPackageTable";
import { Button, Col, Form } from 'antd';
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";

export default class GcMobileIRAUnPackageProperties extends MobileProperties{

    static displayName = 'GcMobileIRAUnPackageProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    queryData = (whereClause) => {
        debugger;
        const self = this;
        let {tableData} = this.state;
        let scanData = "";
        let queryFields = this.form.state.queryFields;
        if (queryFields.length === 1) {
          scanData = this.form.props.form.getFieldValue(queryFields[0].name)
        } 
        if(scanData == undefined || scanData == null || scanData == '') {
            self.showDataNotFound();            
        }
        if(scanData.startsWith("GCB")){
          let requestObject = {
            tableRrn: this.state.tableRrn,
            whereClause: whereClause,
            success: function(responseBody) {
              let dataList = responseBody.dataList;
              if(dataList && dataList.length > 0){
                self.setState({
                  tableData: dataList,
                  loading: false
                });
              } else {
                self.showDataNotFound();
              }
              self.form.resetFormFileds();
            }
          }
          TableManagerRequest.sendGetDataByRrnRequest(requestObject);
        } else {
          if (tableData.length == 0) {
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.DataNotFound) + (scanData || ""));
            self.form.resetFormFileds();
            self.setState({
              tableData: tableData,
              loading: false,
            });
            return;
          } else {
            let dataIndex = -1;
            if (scanData && scanData != null) {
              tableData.map((mLot, index) => {
                  if (mLot.materialLotId == scanData) {
                      dataIndex = index;
                  }
              });
              if(dataIndex != -1){
                  let materialLot = tableData[dataIndex];
                  materialLot["scanFlag"] = true;
                  tableData.splice(dataIndex, 1, materialLot);
              } else {
                    Notification.showInfo(I18NUtils.getClientMessage(i18NCode.DataNotFound) + (scanData || ""));
                }
            }
            self.setState({ 
                tableData: tableData,
                loading: false
            });
            self.form.resetFormFileds();
          }
      }
    }
   
    /**
     * 全部拆包 以表格数据全部传递
     */
     unPackageAll = () => {
        let self = this;
        const {tableData} = self.state;
        self.unPackage(tableData);
    }

    /**
     * 部分拆包 以选择的数据为准进行处理
     *  
     */
    unPackagePartial = () => {
        let self = this;
        const {tableData} = self.state;
        let selectData = [];
        tableData.map((mLot, index) => {
            if(mLot.scanFlag) {
                selectData[index] = mLot;
            }
        })
        self.unPackage(selectData);
    }

    unPackage = (waitToUnpackDetails) => {
        let self = this;
        if (!waitToUnpackDetails || waitToUnpackDetails.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let requestObject = {
            materialLots: waitToUnpackDetails,
            packageType: "IRAUnPackage",
            success: function(responseBody) {
                self.resetData();
                let message = I18NUtils.getClientMessage(i18NCode.OperationSucceed);
                MessageUtils.showOperationSuccess(message);
            }
        }
        IraPackageRequest.sendPackMaterialLotsRequest(requestObject)
    }

    buildButtons = () => {
        let buttons = [];
        buttons.push(
            <Col span={10} className="table-button">
                <Form.Item key="submitBtn" >
                    <Button block type="primary" onClick={this.unPackageAll}>{I18NUtils.getClientMessage(i18NCode.BtnUnPackageAll)}</Button>
                </Form.Item>
            </Col>
        );
  
        buttons.push(
          <Col span={10} className="table-button">
              <Form.Item key="returnBtn" >
                  <Button block type="primary"  onClick={this.unPackagePartial}>{I18NUtils.getClientMessage(i18NCode.BtnUnPackage)}</Button>
              </Form.Item>
          </Col>
        );
  
        buttons.push(
            <Col span={21} className="table-button">
                <Form.Item key="returnBtn" >
                    <Button block type="primary" onClick={this.handleReset}>{I18NUtils.getClientMessage(i18NCode.BtnReset)}</Button>
                </Form.Item>
            </Col>
        );
  
        return buttons;
    }

    buildTable = () => {
        return <MobileIRAUnPackageTable
                                  pagination={false} 
                                  ref={(scanTable) => { this.scanTable = scanTable }}
                                  table={this.state.table} 
                                  data={this.state.tableData} 
                                  loading={this.state.loading} 
                                  resetFlag={this.state.resetFlag}
                                  />
    }
}
