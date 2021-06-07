import EntityProperties from "@properties/framework/EntityProperties";
import VcMaterialLotInventoryScanTable from "@components/vc/table/VcMaterialLotInventoryScanTable";
import NoticeUtils from "@utils/NoticeUtils";
import I18NUtils from "@utils/I18NUtils";
import { i18NCode } from "@const/i18n";

export default class VcMaterialLotInventoryScanProperties extends EntityProperties{

    static displayName = 'VcMaterialLotInventoryScanProperties';

    queryData = (whereClause) => {
        const self = this;
        let mLots= this.state.tableData;
        let queryMLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        let flag = true;
        if(mLots){
            mLots.forEach(mlot => {
                if(mlot.materialLotId === queryMLotId){
                    mlot.scaned = true;
                    flag = false;
                    return;
                }
            });
        }
        if(flag){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.DataNotFound));
        }

        self.form.resetFormFileds();
        self.form.state.queryFields[0].node.focus();
        self.setState({
          tableData: mLots,
          loading: false,
        });    
    }

    buildTable = () => {
        return <VcMaterialLotInventoryScanTable 
                    {...this.getDefaultTableProps()} 
                    resetData={this.resetData.bind(this)} />
    }
}