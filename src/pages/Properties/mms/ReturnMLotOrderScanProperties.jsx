import ReturnMLotOrderScanTable from "@components/mms/table/ReturnMLotOrderScanTable";
import { i18NCode } from "@const/i18n";
import EntityScanProperties from "@properties/framework/EntityScanProperties";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";

/**
 * 产线退仓库
 */
export default class ReturnMLotOrderScanProperties extends EntityScanProperties{

    static displayName = 'ReturnMLotOrderScanProperties';

    constructor(props) {
        super(props);
        this.state = {...this.state, showQueryFormButton:false};
    }

    queryData = (whereClause) => {
        const self = this;
        let mLots= this.state.tableData;
        let queryMLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        let flag = true;
        let showData = [];
        mLots.forEach(mLot => {
            if(queryMLotId === mLot.materialLotId){
                flag = false ;
                mLot.scaned = true;
                showData.unshift(mLot);
            }else{
                showData.push(mLot);
            }
        });
        if(flag){
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
        return <ReturnMLotOrderScanTable
                          {...this.getDefaultTableProps()} 
                          orderTable={this.props.orderTable} 
                          pagination={false} 
                          resetData={this.resetData.bind(this)}
                          resetFlag={this.state.resetFlag}
                          />
    }
}