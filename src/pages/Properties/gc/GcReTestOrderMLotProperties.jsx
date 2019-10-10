import EntityScanProperties from "@properties/framework/EntityScanProperties";
import GcReTestMLotTable from "@components/gc/table/GcReTestMLotTable";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import ValidationSoOrTestRequest from "@api/gc/validation-so-test/ValidationSoOrTestRequest";

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

    afterQuery = (responseBody) => {
      let documentLine = this.props.orderTable.getSingleSelectedRow();
      let queryDatas = responseBody.dataList;
      if (queryDatas && queryDatas.length > 0) {
        let data = queryDatas[0];
        this.validationRule(documentLine, data);
      } else {
        this.showDataNotFound();
      }
    }

    queryData = (whereClause) => {
        const self = this;
        let documentLine = this.props.orderTable.getSingleSelectedRow();
        if (!documentLine) {
            self.setState({ 
                loading: false
            });
            return;
        }
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            self.afterQuery(responseBody);
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
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