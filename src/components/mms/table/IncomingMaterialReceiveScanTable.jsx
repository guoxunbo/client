import { Button, Tag} from 'antd';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import IncomingMaterialReceiveRequest from '@api/Incoming-Material-Manager/Incoming-Material-Receive-Manager/IncomingMaterialReceiveRequest';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import NoticeUtils from '@utils/NoticeUtils';
import EntityDialog from '@components/framework/dialog/EntityDialog';
import IncomingReceiveDialog from '../dialog/IncomingReceiveDialog';

export default class IncomingMaterialReceiveScanTable extends EntityScanViewTable {

    static displayName = 'IncomingMaterialReceiveScanTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createScannedNumber());
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createReceiveButton());
        return buttons;
    }

    getRowClassName = (record, index) => {
        if (record.rowClass) {
            return 'ban-row';
        }else if(record.scaned) {
            return 'scaned-row';
        }else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

    createScannedNumber = () => {
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.ScannedBoxQty)}：{this.getScanned().length} </Tag>
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
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{this.state.data.length}</Tag>
    }
  

    createReceiveButton = () => {
        return <Button key="receive" type="primary" className="table-button" icon="file-excel" onClick={this.receive}>
                        {I18NUtils.getClientMessage(i18NCode.BtnReceive)}
                    </Button>
    }

    receive = () => {
        let self = this;
        let materialLots = this.getScanned();
        let doc = this.props.orderTable.getSingleSelectedRow();
        if (materialLots.length === 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let requestObject = {
            materialLotList: materialLots,
            documentId: doc.name,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.setState({
                        loading: false
                    });
                    self.props.resetData();
                    self.props.onSearch();
                }
                NoticeUtils.showSuccess();
            }
        }
        IncomingMaterialReceiveRequest.sendReceiveRequest(requestObject);
    }
     /**
     * 接收数据不具备可删除等操作
     */
    buildOperation = (record) => {
        let operations = [];
        operations.push(this.buildEditButton(record));
        return operations;
    }
    
    buildEditButton = (record) => {
        let hasEditBtnAuthority = false;
        if(!record.scaned){
            hasEditBtnAuthority = true;
        }
        return <Button key="edit" style={{marginRight:'1px'}} icon="edit" size="small" 
                        onClick={() => this.openDialog(record)} 
                        disabled={hasEditBtnAuthority} href="javascript:;"/>
    }

    openDialog =(record)=>{
        this.setState({
            formVisible : true,
            editorObject: record
        })
    }
    
    createForm = () => {
        return  <IncomingReceiveDialog ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }
}
const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};


