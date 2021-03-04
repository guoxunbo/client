import IssueLotOrderScanTable from "@components/mms/table/IssueLotOrderScanTable";
import { i18Messages, i18NCode } from "@const/i18n";
import EntityScanProperties from "@properties/framework/EntityScanProperties";
import I18NUtils from "@utils/I18NUtils";
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
              NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.MLotAlreadyIssue));
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
        return <IssueLotOrderScanTable
                          {...this.getDefaultTableProps()} 
                          orderTable={this.props.orderTable} 
                          pagination={false} 
                          resetData={this.resetData.bind(this)}
                          resetFlag={this.state.resetFlag}
                          onSearch={this.props.onSearch}                      
                          />
    }
}