import { Button, Input, Tag} from 'antd';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import IncomingMaterialReceiveRequest from '@api/Incoming-Material-Manager/Incoming-Material-Receive-Manager/IncomingMaterialReceiveRequest';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import NoticeUtils from '@utils/NoticeUtils';
import IconUtils from '@utils/IconUtils';
import BarCodeDialog,{ CodeType } from '@components/framework/dialog/BarCodeDialog';

export default class IncomingMaterialReceiveScanTable extends EntityScanViewTable {

    static displayName = 'IncomingMaterialReceiveScanTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showCodeType: "", okText: "", codeValue: ""}};
    }
    
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
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.ScannedQty)}：{this.getScanned().length} </Tag>
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
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.Qty)}：{this.state.data.length}</Tag>
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

    // buildOperationColumn = () => {
        
    // }

    buildOperation = (record) => {
        let operations = [];
        operations.push(this.buildBarCodeButton(record));
        return operations;
    }

    buildBarCodeButton = (record) => {
        return <Button key="barcode" style={{marginRight:'1px'}} onClick={() => this.handleShowBarCode(record)} size="small" href="javascript:;">
                     {IconUtils.buildIcon("icon-barcode")}
                </Button>;
    }

    handleShowBarCode = (record) => {
        this.setState({
            barCodeFormVisible: true,
            codeValue: record.materialLotId,
            okText: I18NUtils.getClientMessage(i18NCode.BtnPrint),
            showCodeType: CodeType.BarCode,
        })
    }

    createForm = () => {
        let children = [];
        children.push(<BarCodeDialog width={300} type={this.state.showCodeType} key={BarCodeDialog.displayName} ref={this.formRef} value={this.state.codeValue} visible={this.state.barCodeFormVisible} 
                                                            okText={this.state.okText} onOk={this.handlePrintOk} onCancel={this.handleCancelPrint} />);                                   
        return children;
    }

    handlePrintOk = () => {
        this.setState({
            barCodeFormVisible: false
        })
    }

    handleCancelPrint = () => {
        this.setState({
            barCodeFormVisible: false
        })
    }
}
const styles = {
    tableButton: {
        marginLeft:'20px'
    },  
    input:{
        width: 200,
        marginLeft : '10px'
    },
};


