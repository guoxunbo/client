import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import IncomingMaterialReceiveScanProperties from "../mms/IncomingMaterialReceiveScanProperties";
import VcFinishGoodReceiveScanTable from "@components/vc/table/VcFinishGoodReceiveScanTable";

export default class VcFinishGoodReceiveScanProperties extends IncomingMaterialReceiveScanProperties{

    static displayName =  'VcFinishGoodReceiveScanProperties';

    constructor (props){
        super(props);
        this.state = {...this.state};
    }
    
    queryData = (whereClause) => {
        const self = this;
        let mLots= this.state.tableData; 
        let queryMLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        let materialLot ;
        let showData = [];
        mLots.forEach(mLot => {
            if(queryMLotId === mLot.materialLotId){
                materialLot = mLot;
                mLot.scaned = true;
                showData.unshift(mLot);
            }else{
                showData.push(mLot);
            } 
        })
        if(!materialLot){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
        }
        self.form.resetFormFileds();
        self.form.state.queryFields[0].node.focus();
        self.setState({
            tableData: showData,
            loading: false,
        });     
    }


    buildTable = () => {
        return <VcFinishGoodReceiveScanTable
                          {...this.getDefaultTableProps()} 
                          orderTable={this.props.orderTable} 
                          pagination={false} 
                          resetData={this.resetData.bind(this)}
                          resetFlag={this.state.resetFlag}   
                          onSearch={this.props.onSearch}                      
                          />
    }
}
