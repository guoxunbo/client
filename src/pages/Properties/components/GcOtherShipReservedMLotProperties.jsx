import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GcOtherShipReservedMLotTable from "../../../components/Table/gc/GcOtherShipReservedMLotTable";

export default class GcOtherShipReservedMLotProperties extends EntityScanProperties{

    static displayName = 'GcOtherShipReservedMLotProperties';
    
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

    buildTable = () => {
        return <GcOtherShipReservedMLotTable 
                            pagination={false}
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