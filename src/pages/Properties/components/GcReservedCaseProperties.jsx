import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GcReservedCaseTable from "../../../components/Table/gc/GcReservedCaseTable";

export default class GcReservedCaseProperties extends EntityScanProperties{

    static displayName = 'GcReservedCaseProperties';
    
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
      
    }

    buildTable = () => {
        return <GcReservedCaseTable 
                            orderTable={this.props.orderTable} 
                            table={this.state.table} 
                            data={this.state.tableData} 
                            loading={this.state.loading} 
                            resetData={this.resetData.bind(this)}
                            resetFlag={this.state.resetFlag}
                            docLineRrn={this.state.docLineRrn}
                            onSearch={this.props.onSearch}/>
    }

}