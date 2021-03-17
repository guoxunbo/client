import ReturnMLotOrderScanTable from "@components/mms/table/ReturnMLotOrderScanTable";
import EntityScanProperties from "@properties/framework/EntityScanProperties";


export default class ReturnMLotOrderScanProperties extends EntityScanProperties{

    static displayName = 'ReturnMLotOrderScanProperties';

    constructor(props) {
        super(props);
        this.state = {...this.state, showQueryFormButton:false};
    }

    queryData = (whereClause) => {
        const self = this;
        let mLots= this.state.tableData;
        let queryMatlotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        let flag = false;
        let materialLot = '';
        if(mLots){
          mLots.forEach(mLot => {
              if(queryMatlotId === mLot.materialLotId){
                flag = true ;
                mLot.scaned = true;
                materialLot = mLot;
              }
          });
          if(!flag){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.MLotNonentity));
          }
          if(materialLot){
            if(materialLot.rowClass){
              materialLot.scaned = false;
              NoticeUtils.showInfo(I18NUtils.getClientMessage("批次已发料"));
            }
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
        return <ReturnMLotOrderScanTable
                          {...this.getDefaultTableProps()} 
                          orderTable={this.props.orderTable} 
                          pagination={false} 
                          resetData={this.resetData.bind(this)}
                          resetFlag={this.state.resetFlag}
                          />
    }
}