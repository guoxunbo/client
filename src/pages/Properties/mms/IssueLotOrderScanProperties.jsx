import IssueLotOrderScanTable from "@components/mms/table/IssueLotOrderScanTable";
import EntityScanProperties from "@properties/framework/EntityScanProperties";
import NoticeUtils from "@utils/NoticeUtils";

export default class IssueLotOrderScanProperties extends EntityScanProperties{

    static displayName = 'IssueLotOrderScanProperties';
    
    constructor(props) {
        super(props);
        this.state= {...this.state, ...{showQueryFormButton: false}}
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
        let flag = false;
        let flag1 = true;
        if(mLots){
          mLots.forEach(mLot => {
              if(queryMatlotId === mLot.materialLotId){
                flag = true ;
                mLot.scaned = true;
              }
              if("Issue" == mLot.status){
                mLot.scaned = false;
                flag1 = false;
              }
          });
          if(!flag){
            NoticeUtils.showInfo("该物料批次号不存在");
          }
          if(flag & !flag1){
            NoticeUtils.showInfo("该批次已发料");
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
        return <IssueLotOrderScanTable
                          {...this.getDefaultTableProps()} 
                          orderTable={this.props.orderTable} 
                          pagination={false} 
                          resetData={this.resetData.bind(this)}
                          resetFlag={this.state.resetFlag}                         
                          />
    }
}