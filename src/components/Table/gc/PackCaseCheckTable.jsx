import { Button, Col, Form, Input, Row, Switch } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import EntityScanViewTable from '../EntityScanViewTable';
import { Notification } from '../../notice/Notice';
import MessageUtils from '../../../api/utils/MessageUtils';
import PackCaseCheckForm from './PackCaseCheckForm';
import TableManagerRequest from '../../../api/table-manager/TableManagerRequest';
import MaterialLotManagerRequest from '../../../api/gc/material-lot-manager/MaterialLotManagerRequest';
import Icon from '@icedesign/icon';

const PackCaseCheckTableName="GCPackCaseCheck";

export default class PackCaseCheckTable extends EntityScanViewTable {

    static displayName = 'PackCaseCheckTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{formTable: {fields: []}},...{checked:true},...{value: "check"}};
    }

    getRowClassName = (record, index) => {
        if (record.scaned && record.checkQRFlag) {
            return 'check-row';
        } else if(record.scaned && record.checkQRFlag == undefined){
            return 'scaned-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

    buildOperationColumn = () => {
    }
    
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createJudgePassButton());
        buttons.push(this.createJudgeNgButton());
        return buttons;
    }

    createTagGroup = () => {
        let tagList = [];
        tagList.push(this.createQRCodeCheckTag());
        return tagList;
    }

    createQRCodeCheckTag = () => {
        return  <Row gutter={12}>
            <Col span={2} >
                <span style={{marginLeft:"10px", fontSize:"19px"}}>
                    {I18NUtils.getClientMessage(i18NCode.QRCodeInput)}:
                </span>
            </Col>
            <Col span={5}>
                <Input ref={(QRcode) => { this.QRcode = QRcode }} key="BoxQRCode" placeholder="箱二维码" onPressEnter={this.onQRCodeInput}/>
            </Col>
            <Col span={4} >
                <span style={{marginLeft:"10px", fontSize:"19px"}}>
                    {I18NUtils.getClientMessage(i18NCode.CheckQRCode)}:
                </span>
            </Col>
            <Col span={1}>
                <Switch ref={(checkedChildren) => { this.checkedChildren = checkedChildren }} 
                            checkedChildren={<Icon type="check" />} 
                            unCheckedChildren={<Icon type="close" />} 
                            onChange={this.handleChange} 
                            disabled={this.disabled}
                            checked={this.state.checked}/>
            </Col>
        </Row>
    }

    onQRCodeInput = () => {
        let self = this;
        const {data, selectedRows} = this.state;
        let QRcode = this.QRcode.state.value;
        if (!QRcode) {	
            return;	
        }
        if(data.length == 0){
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.NoVBoxInfo));
            this.QRcode.setState({value:""})
            return;
        }
        if (selectedRows.length != data.length) {
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.NOScanAllVBox));
            this.QRcode.setState({value:""})
            return;
        }
        data.forEach(materialLot => {
            if(materialLot.boxQrcodeInfo == QRcode){
                materialLot.checkQRFlag = true;
            }
        });
        this.QRcode.setState({value:""})
        self.setState({
            data: data
        });
    }

    handleChange = (checkedChildren) => {
        if(checkedChildren){
            this.setState({ 
                value: "check",
                checked: true
            });
        } else {
            this.setState({ 
                value: "",
                checked: false
            });
        }
    }

    createForm = () => {
        const WrappedAdvancedPackCaseCheckForm = Form.create()(PackCaseCheckForm);
        return  <WrappedAdvancedPackCaseCheckForm checkItemList={this.props.checkItemList} ref={this.formRef} object={this.state.data} visible={this.state.formVisible} 
                                            table={this.state.formTable} onOk={this.judgeSuccess} onCancel={this.handleCancel} />
    }

    judgeSuccess = () => {
        this.setState({formVisible : false});
        if (this.props.resetData) {
            this.props.resetData();
        }
        MessageUtils.showOperationSuccess();
    }

    judgePass = () => {
        var self = this;
        const {data, selectedRows} = this.state;
        let checkQRCodeFlag = self.state.value;
        if (!data || data.length === 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        if (this.props.scanErrorFlag) {
            Notification.showNotice("出现过扫描错误，请重新查找并重新扫描");
            return;
        }
        if (selectedRows.length != data.length) {
            Notification.showNotice("数据没有全部扫描");
            return;
        }
        if(checkQRCodeFlag == "check"){
            if(this.validateQRCode(data)){
                Notification.showNotice(I18NUtils.getClientMessage(i18NCode.QRCodeNotFullyScan));
                return;
            }
        }
        let object = {
            packedLotDetails : selectedRows,
            success: function(responseBody) {
                self.judgeSuccess()
            }
        }
        MaterialLotManagerRequest.sendJudgePackedMaterialLotRequest(object);
    }

    validateQRCode(materialLots){
        let flag = false;
        materialLots.forEach(data => {
            if(data.checkQRFlag == undefined){
                flag = true;
            }
        });
        return flag;
    }

    judgeNg = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let requestObject = {
            name: PackCaseCheckTableName,
            success: function(responseBody) {
                self.setState({
                    formTable: responseBody.table,
                    formVisible : true
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    createJudgePassButton = () => {
        return <Button key="judgePass" type="primary" style={styles.tableButton} icon="inbox" onClick={this.judgePass}>
                        Pass
                    </Button>
    }

    createJudgeNgButton = () => {
        return <Button key="judgeNg" type="primary" style={styles.tableButton} icon="inbox" onClick={this.judgeNg}>
                        NG
                    </Button>
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
