import IncomingMaterialReceiveScanTable from "@components/mms/table/IncomingMaterialReceiveScanTable";
import { i18NCode } from "@const/i18n";
import EntityScanProperties from "@properties/framework/EntityScanProperties";
import I18NUtils from "@utils/I18NUtils";
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
        let queryMLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        let queryQty = self.form.props.form.getFieldValue(self.form.state.queryFields[1].name);
        if(queryQty == undefined || queryQty == ''){
            this.form.state.queryFields[1].node.focus();
            this.setState({
              loading : false,
            })
            return;
        }
        let flag = false;
        let materialLot ;
        if(mLots){
          mLots.forEach(mLot => {
            if(queryMLotId === mLot.materialLotId){
                mLot.currentQty = queryQty;
                materialLot = mLot;
                mLot.scaned = true;
              }
          });
          if(materialLot){
            if(materialLot.rowClass){
              materialLot.scaned = false;
              NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.MLotAlreadyReceived));
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
        return <IncomingMaterialReceiveScanTable 
                          {...this.getDefaultTableProps()} 
                          orderTable={this.props.orderTable} 
                          pagination={false} 
                          resetData={this.resetData.bind(this)}
                          resetFlag={this.state.resetFlag}   
                          onSearch={this.props.onSearch}                      
                          />
    }
}