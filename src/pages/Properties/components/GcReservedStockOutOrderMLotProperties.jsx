import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GcReservedMLotTable from "../../../components/Table/gc/GcReservedMLotTable";

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

    queryData = (whereClause) => {
      
    }

    buildTable = () => {
        return <GcReservedMLotTable 
                            orderTable={this.props.orderTable} 
                            table={this.state.table} 
                            data={this.state.tableData} 
                            loading={this.state.loading} 
                            resetData={this.resetData.bind(this)}
                            resetFlag={this.state.resetFlag}/>
    }

}