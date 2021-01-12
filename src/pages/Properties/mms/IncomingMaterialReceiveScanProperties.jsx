import IncomingMaterialReceiveScanTable from "@components/mms/table/IncomingMaterialReceiveScanTable";
import EntityScanProperties from "@properties/framework/EntityScanProperties";
import NoticeUtils from "@utils/NoticeUtils";

export default class IncomingMaterialReceiveScanProperties extends EntityScanProperties{

    static displayName = 'IncomingMaterialReceiveScanProperties';
    
    constructor(props) {
        super(props);
        this.state= {...this.state, ...{showQueryFormButton: true}}
    }

    componentWillReceiveProps = (props) => {
        const {resetFlag} = props;
        if (resetFlag) {
           this.form.handleReset();
        }
    }

    queryData = (whereClause) => {
        const self = this;
        let mLots= this.state.tableData;
        let queryMatlotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        let queryQty = self.form.props.form.getFieldValue(self.form.state.queryFields[1].name);
        let flag = false;
        if(mLots){
          mLots.forEach(mLot => {
              if(queryMatlotId === mLot.materialLotId && queryQty == mLot.currentQty){
                flag = true ;
                mLot.scaned = true;
              }
          });
          if(!flag){
            NoticeUtils.showInfo("该物料批次与该单据号不一致或数量不一致");
          }
        }
        self.form.resetFormFileds();
        this.form.state.queryFields[0].node.focus();
        self.setState({
          tableData: mLots,
          loading: false,
        });    
    }

    resetOrderData = (orderTable) => {
        orderTable.setState({
          data: [],
          loading: false,
          resetFlag: true
        });
    }

    buildTable = () => {
        return <IncomingMaterialReceiveScanTable 
                          {...this.getDefaultTableProps()} 
                          orderTable={this.props.orderTable} 
                          pagination={false} 
                          resetData={this.resetData.bind(this)}
                          resetFlag={this.state.resetFlag}                         
                          />
    }
}