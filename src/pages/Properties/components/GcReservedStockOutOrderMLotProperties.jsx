import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GcReservedMLotTable from "../../../components/Table/gc/GcReservedMLotTable";
import { Notification } from "../../../components/notice/Notice";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";

export default class GcReservedStockOutOrderMLotProperties extends EntityScanProperties{

    static displayName = 'GcReservedStockOutOrderMLotProperties';
    
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
        window.location.reload(true);
          // this.form.handleReset();
      }
    }


    handleSearch = () => {
      let {rowKey,tableData, selectedRowKeys, selectedRows} = this.state;
      let queryFields = this.form.state.queryFields;
      let vboxId = this.form.props.form.getFieldValue(queryFields[0].name);
      if(tableData && tableData.length > 0){
         if(this.validationMaterial(vboxId, tableData)){
          tableData.forEach((materialLot) => {
            if(materialLot.materialLotId === vboxId){
              selectedRowKeys.push(materialLot[rowKey]);
              selectedRows.push(materialLot);
            }
          }); 
          this.setState({ 
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows,
          });
         } else {
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.DataNotFound)+vboxId);
         }
      } else {
          Notification.showInfo(I18NUtils.getClientMessage(i18NCode.ReservedListCannotEmpty));
      }
      this.form.resetFormFileds();
      this.form.state.queryFields[0].node.focus();
    }

    validationMaterial(vboxId, materialLots){
      let flag = false;
      materialLots.forEach((materialLot) => {
            if( materialLot.materialLotId == vboxId){
                flag = true;
                return flag;
            }
        });
        return flag;
    }

    buildTable = () => {
        return <GcReservedMLotTable 
                            pagination={false}
                            rowKey={this.state.rowKey} 
                            orderTable={this.props.orderTable} 
                            table={this.state.table} 
                            data={this.state.tableData} 
                            loading={this.state.loading} 
                            resetData={this.resetData.bind(this)}
                            resetFlag={this.state.resetFlag}
                            selectedRowKeys={this.state.selectedRowKeys} 
                            selectedRows={this.state.selectedRows} />
    }

}