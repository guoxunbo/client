import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GcReTestMLotTable from "../../../components/Table/gc/GcReTestMLotTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import ValidationSoOrTestRequest from "../../../api/gc/validation-so-test/ValidationSoOrTestRequest";
import ValidationMaterialRequest from "../../../api/gc/validation -material/ValidationMaterialRequest";
import ValidateDocumentLineRequest from "../../../api/gc/validate-documentline/ValidateDocumentLineRequest";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import { Notification } from "../../../components/notice/Notice";

export default class GcReTestOrderMLotProperties extends EntityScanProperties{

    static displayName = 'GcReTestOrderMLotProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
    }
    
    /**
     * 20190921 gc要求重置的时候，2个表格数据都要清空
     */
    componentWillReceiveProps = (props) => {
      const {resetFlag} = props;
      if (resetFlag) {
        this.form.handleReset();
      }
    }

    queryData = (whereClause) => {
        debugger;
        const self = this;
        let {rowKey,tableData} = this.state;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            if (queryDatas && queryDatas.length > 0) {
              let data = queryDatas[0];
              if(tableData && tableData.length > 0){
                let materialFirst = tableData[0];
                self.validationMaterialRule(materialFirst, data);
              } else {
                queryDatas.forEach(data => {
                  if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                    tableData.unshift(data);
                    self.getMatchesOrder(data);
                  }
                });
                self.setState({ 
                  tableData: tableData,
                  loading: false
                });
                self.form.resetFormFileds();
              }
            } else {
              self.showDataNotFound();
            }
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    /**
     * 20191018 gc要求扫描Box信息的同时查询出能匹配该BOX的订单信息，如果订单信息只有
     * 一条默认选中，如果订单有多条，默认选择第一条
     */
    getMatchesOrder = (materialLot) => {
      debugger;
      let self = this;
      let orderTabel = this.props.orderTable;
      let {selectedRowKeys, selectedRows} = orderTabel.state;
      let documentLines = orderTabel.props.data;
      let requestObject = {
        documentLines : documentLines,
        materialLot : materialLot,
        success: function(responseBody) {
          let queryDatas = responseBody.documentLineList;
          if (queryDatas && queryDatas.length > 0) {
            self.resetOrderData(orderTabel);
            selectedRowKeys.push(queryDatas[0]);
            selectedRows.push(queryDatas[0]);
            orderTabel.setState({
              selectedRowKeys: selectedRowKeys,
              selectedRows: selectedRows,
              data: queryDatas,
              loading: false,
              resetFlag: true
            });

          } else {
            self.showNoMatchingOrder();
            self.resetOrderData(orderTabel);
          }
        }
      }
      ValidateDocumentLineRequest.sendValidationRequest(requestObject);
    }

    resetOrderData = (orderTabel) => {
      orderTabel.setState({
        data: [],
        loading: false,
        resetFlag: true
      });
  }

    showNoMatchingOrder = () => {
      this.setState({ 
        loading: false
      });
      Notification.showInfo(I18NUtils.getClientMessage(i18NCode.NoMatchingOrder));
    }

    /**
     * 20191011 gc要求扫描箱信息时以箱信息进行对比验证
     */
    validationMaterialRule = (materialLotFirst, materialLot) => {
      let self = this;
      let {rowKey,tableData} = this.state;
      let requestObject = {
        materialLotFirst : materialLotFirst,
        materialLot : materialLot,
        success: function(responseBody) {
          if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
            tableData.unshift(materialLot);
          }
          self.setState({ 
            tableData: tableData,
            loading: false
          });
          self.form.resetFormFileds();
        },
        fail: function() {
          self.setState({ 
              loading: false
          });
          self.form.resetFormFileds();
        }
      }
      ValidationMaterialRequest.sendValidationRequest(requestObject);
    }

    validationRule = (documentLine, materialLot) => {
      let self = this;
      let {rowKey,tableData} = this.state;
      let requestObject = {
        documentLine : documentLine,
        materialLot : materialLot,
        success: function(responseBody) {
          if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
            tableData.unshift(materialLot);
          }
          self.setState({ 
            tableData: tableData,
            loading: false
          });
          self.form.resetFormFileds();
        },
        fail: function() {
          self.setState({ 
              loading: false
          });
          self.form.resetFormFileds();
        }
      }
      ValidationSoOrTestRequest.sendValidationRequest(requestObject);
    }

    buildTable = () => {
        return <GcReTestMLotTable orderTable={this.props.orderTable} pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}