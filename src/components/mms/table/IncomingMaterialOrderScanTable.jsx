import { Button, Tag} from 'antd';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import IncomingMaterialReceiveRequest from '@api/Incoming-Material-Manager/Incoming-Material-Receive-Manager/IncomingMaterialReceiveRequest';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import NoticeUtils from '@utils/NoticeUtils';

export default class IncomingMaterialOrderScanTable extends EntityScanViewTable {

    static displayName = 'IncomingMaterialOrderScanTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createScannedNumber());
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createReceiveButton());
        return buttons;
    }

    createScannedNumber = () => {
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage("已扫描箱数")}：{this.getScanned().length} </Tag>
    }

    getScanned = () => {
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

    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage("总箱数")}：{this.state.data.length}</Tag>
    }
  

    createReceiveButton = () => {
        return <Button key="receive" type="primary" className="table-button" icon="file-excel" onClick={this.receive}>
                        {I18NUtils.getClientMessage(i18NCode.BtnReceive)}
                    </Button>
    }

    receive = () => {
        debugger;
        let self = this;
        let materialLots = this.getScanned();
        let docId = '';
        if (materialLots.length === 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(materialLots){
            docId =materialLots[0].incomingDocId ;
         }
      
        let requestObject = {
            materialLotList: materialLots,
            documentId: docId,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.setState({
                        loading: false
                    });
                    self.props.resetData();
                }
                NoticeUtils.showSuccess();
            }
        }
        IncomingMaterialReceiveRequest.sendReceiveRequest(requestObject);
    }
     /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }
    
}
const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};


