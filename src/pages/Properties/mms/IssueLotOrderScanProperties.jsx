import IssueLotOrderScanTable from "@components/mms/table/IssueLotOrderScanTable";
import { i18Messages, i18NCode } from "@const/i18n";
import EntityScanProperties from "@properties/framework/EntityScanProperties";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";

/**
 * 发往mes的发料(主材 辅材 成品)通用
 */
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
        let showData = [];
        mLots.forEach(mLot => {
            if(queryMatlotId === mLot.materialLotId){
                flag = true ;
                mLot.scaned = true;
                showData.unshift(mLot);
            }else{
                showData.push(mLot);
              }
        });
        if(!flag){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.DataNotFound));
        }
        self.form.resetFormFileds();
        this.form.state.queryFields[0].node.focus();
        self.setState({
          tableData: showData,
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