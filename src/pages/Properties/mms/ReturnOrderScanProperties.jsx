import ReturnOrderScanTable from "@components/mms/table/ReturnOrderScanTable";
import EntityScanProperties from "../framework/EntityScanProperties";
import { EditableTable } from "@components/framework/table/EditorTable";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import ReturnLotOrderRequest from "@api/return-material-manager/ReturnLotOrderRequest";
import TableUtils from "@components/framework/utils/TableUtils";
import NoticeUtils from "@utils/NoticeUtils";
import I18NUtils from "@utils/I18NUtils";
import { i18NCode } from "@const/i18n";

/**
 * 仓库退到供应商
 */
export default class ReturnOrderScanProperties extends EntityScanProperties{

    static displayName = 'ReturnOrderScanProperties';

    constructor(props) {
        super(props);
        this.state= {...this.state, ...{showQueryFormButton: false}}
    }

    resetData = () => {
        this.setState({
            selectedRowKeys: [],
            selectedRows: [],
            tableData: [],
            loading: false,
            resetFlag: true
        });
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
        self.form.state.queryFields[0].node.focus();
        self.setState({
          tableData: showData,
          loading: false,
        });    
    }


    buildTable = () => {
        return (<div>
                    <ReturnOrderScanTable 
                        {...this.getDefaultTableProps()} 
                        orderTable={this.props.orderTable} 
                        resetData={this.resetData.bind(this)} 
                        onSearch = {this.props.onSearch}
                        resetFlag={this.state.resetFlag}/>
                </div>)
    }
}