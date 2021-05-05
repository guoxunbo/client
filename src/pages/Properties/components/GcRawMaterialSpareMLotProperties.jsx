import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GcRawMaterialSpareMLotTable from "../../../components/Table/gc/GcRawMaterialSpareMLotTable";

export default class GcRawMaterialSpareMLotProperties extends EntityScanProperties{

    static displayName = 'GcRawMaterialSpareMLotProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
    }

    componentWillReceiveProps = (props) => {
      const {resetFlag} = props;
      if (resetFlag) {
          this.form.handleReset();
      }
    }

    buildTable = () => {
        return <GcRawMaterialSpareMLotTable 
                            orderTable={this.props.spareOrderTable} 
                            rowKey={this.state.rowKey} 
                            pagination={false} 
                            table={this.state.table} 
                            data={this.state.tableData} 
                            unReservedQty={this.state.unReservedQty}
                            loading={this.state.loading} 
                            resetData={this.resetData.bind(this)}
                            resetFlag={this.state.resetFlag}
                            selectedRowKeys={this.state.selectedRowKeys} 
                            selectedRows={this.state.selectedRows}
                            onSearch={this.props.onSearch}
                            />
    }

}