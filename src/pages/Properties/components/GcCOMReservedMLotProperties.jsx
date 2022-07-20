import GcCOMReservedMLotTable from "../../../components/Table/gc/GcCOMReservedMLotTable";
import { Notification } from "../../../components/notice/Notice";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import EntityScanProperties from "./entityProperties/EntityScanProperties";

export default class GcCOMReservedMLotProperties extends EntityScanProperties{

    static displayName = 'GcCOMReservedMLotProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state,...{showQueryFormButton: false}};
    }

    componentWillReceiveProps = (props) => {
      const {resetFlag} = props;
      if (resetFlag) {
        this.form.handleReset();
      }
    }

    queryData = (whereClause) => {
      const self = this;
      let {rowKey,tableData} = this.state;
      const selectedRowKeys = [...this.state.selectedRowKeys];
      const selectedRows = [...this.state.selectedRows];

      if(tableData.length == 0){
        return;
      }
      self.setState({
        loading: false
      });
      let materialLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
      if(materialLotId == undefined || materialLotId == "" || materialLotId == null){
        return;
      }
      let chckFlag = true;
      tableData.forEach(mLot => {
        if(mLot.materialLotId === materialLotId){
            let dataIndex = tableData.indexOf(mLot);
            if (dataIndex > -1 ) {
              chckFlag = false;
              tableData.splice(dataIndex, 1);
              let checkIndex = selectedRowKeys.indexOf(mLot[rowKey]);
              if (checkIndex < 0) {
                  selectedRowKeys.push(mLot[rowKey]);
                  selectedRows.push(mLot);
              }
              tableData.unshift(mLot);
            }
        }
      });
      if(chckFlag){
        tableData.forEach(mLot => {
          if(mLot.parentMaterialLotId === materialLotId){
              let dataIndex = tableData.indexOf(mLot);
              if (dataIndex > -1 ) {
                tableData.splice(dataIndex, 1);
              }
              let checkIndex = selectedRowKeys.indexOf(mLot[rowKey]);
              if (checkIndex < 0) {
                  selectedRowKeys.push(mLot[rowKey]);
                  selectedRows.push(mLot);
              }
              tableData.unshift(mLot);
          }
        });
      }

      this.setState({ 
        selectedRowKeys: selectedRowKeys,
        selectedRows: selectedRows
      });
      self.form.resetFormFileds();
      this.form.state.queryFields[0].node.focus();
    }

    buildTable = () => {
        return <GcCOMReservedMLotTable 
                            pagination={true}
                            rowKey={this.state.rowKey} 
                            orderTable={this.props.orderTable} 
                            table={this.state.table} 
                            data={this.state.tableData}
                            packedRuleList={this.state.packedRuleList}
                            defaultQty={this.state.defaultQty}
                            unReservedQty={this.state.unReservedQty}
                            docLineRrn={this.state.docLineRrn}
                            loading={this.state.loading} 
                            resetData={this.resetData.bind(this)}
                            resetFlag={this.state.resetFlag}
                            selectedRowKeys={this.state.selectedRowKeys} 
                            selectedRows={this.state.selectedRows}
                            onSearch={this.props.onSearch} />
    }

}