import { Button } from "@alifd/next";
import VcMaterialLotInventoryRequest from "@api/vc/material-lot-inventory-manager/VcMaterialLotInventoryRequest";
import EntityListTable from "@components/framework/table/EntityListTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import IconUtils from "@utils/IconUtils";
import NoticeUtils from "@utils/NoticeUtils";

export default class VcStockOutMLotByOrderTable extends EntityListTable{

    getRowClassName = (record, index) => {
        if(record.scaned) {
            return 'scaned-row';
        }else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    }

    selectRow=()=>{

    }

    buildOperationColumn =()=>{

    }

    //已经扫描的materialLot
    getScannedRows = () => {
        let datas = this.state.data ;
        let scanned = [];
        if(datas){
            datas.forEach(data => {
                if(data.scaned){
                    scanned.push(data) ;
                }
            })
        }
        return scanned ;
    }

    createButtonGroup=()=>{
        let buttons = [] ;
        buttons.push(this.createPickButton());

        return buttons;
    }

    createPickButton =()=>{
        return(<Button key="pick" type="primary" icon='inbox' onClick={this.handledPick}>
            {IconUtils.buildIcon("icon-lingliao")} {I18NUtils.getClientMessage("下架")}
        </Button>)
    }

    handledPick =()=>{
        let self = this ;
       
        self.props.resetMLotId();
        let materialLots = self.getScannedRows();
        if(!materialLots){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
        }

        let object = {
            materialLots: materialLots,
            success:function (params) {
                self.props.resetMLotId();
                self.refreshDelete(materialLots);
            }
        }
        VcMaterialLotInventoryRequest.sendPickRequest(object);
    }
}
