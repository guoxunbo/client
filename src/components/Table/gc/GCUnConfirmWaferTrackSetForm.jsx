import  React from 'react';
import {SystemRefListName } from '../../../api/const/ConstDefine';
import EntityForm from '../../Form/EntityForm';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Button, Col, Input, Row, Switch } from 'antd';
import RefListField from '../../Field/RefListField';
import Icon from '@icedesign/icon';
import FormItem from 'antd/lib/form/FormItem';
import UnConfirmWaferSet from '../../../api/dto/gc/UnConfirmWaferSet';
import UnConfirmWaferManagerRequest from '../../../api/gc/gc-unconfirmWafer-manager/UnConfirmWaferManagerRequest';

export default class GCUnConfirmWaferTrackSetForm extends EntityForm {

    static displayName = 'GCUnConfirmWaferTrackSetForm';

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps = (props) => {
        debugger;
        this.buildForm();
        const {visible, unConfirmWaferSet} = props;
        let self = this;
        if (visible) {
            this.setUnConfirmWaferTrackSetForm(unConfirmWaferSet);
        } else {
            self.setState({
                selectedRows: [],
                selectedRowKeys: []
            })
        }
    }   

    buildForm = () =>  {
        return  <FormItem>
                    <Row gutter={12}>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.SerialNumber)}:</span>
                        </Col>
                        <Col span={8}>
                            <Input ref={(serialNumber) => { this.serialNumber = serialNumber }} key="serialNumber"/>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.LotId)}:</span>
                        </Col>
                        <Col span={8}>
                            <Input ref={(lotId) => { this.lotId = lotId }}/>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.TestSite)}:</span>
                        </Col>
                        <Col span={8}>
                            <Input ref={(testSite) => { this.testSite = testSite }}/>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.ModelId)}:</span>
                        </Col>
                        <Col span={8}>
                            <Input ref={(modelId) => { this.modelId = modelId }}/>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.ExceptionClassify)}:</span>
                        </Col>
                        <Col span={8}>
                            <Input ref={(exceptionClassify) => { this.exceptionClassify = exceptionClassify }}/>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.RiskGrade)}:</span>
                        </Col>
                        <Col span={8}>
                            <RefListField ref={(riskGrade) => { this.riskGrade = riskGrade }} referenceName={SystemRefListName.RiskGrade} />
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Button key="selectAll" type="primary" style={styles.tableButton} onClick={() => this.selectChange()}>{I18NUtils.getClientMessage(i18NCode.AllSelectWaferId)}</Button>
                    </Row>
                    {this.buildWaferInfoBox()}
                </FormItem>
    }

    handleOk= () => {
        let self = this;
        let waferSet = self.props.unConfirmWaferSet;
        let serialNumber = self.serialNumber.state.value;
        let lotId = self.lotId.state.value;
        let testSite = self.testSite.state.value;
        let modelId = self.modelId.state.value;
        let exceptionClassify = self.exceptionClassify.state.value;
        let riskGrade = self.riskGrade.state.value;
        let waferId = this.getWaferIdInfo();
        if(waferSet.objectRrn){
            waferSet.serialNumber = serialNumber;
            waferSet.lotId = lotId;
            waferSet.testSite =testSite;
            waferSet.mdelId = modelId;
            waferSet.exceptionClassify = exceptionClassify;
            waferSet.riskGrade = riskGrade;
            waferSet.waferId = waferId;
        } else {
            waferSet = new UnConfirmWaferSet();
            waferSet.setSerialNumber(serialNumber);
            waferSet.setLotId(lotId);
            waferSet.setTestSite(testSite);
            waferSet.setModelId(modelId);
            waferSet.setExceptionClassify(exceptionClassify);
            waferSet.setRiskGrade(riskGrade);
            waferSet.setWaferId(waferId);
        }

        let object = {
            waferSet: waferSet, 
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.unConfirmWaferSet);
                }
            }
        };
        UnConfirmWaferManagerRequest.sendMergeRequest(object);
    }

    buildWaferInfoBox =() => {
        return (
            <div>
                <h2 className="section-title">{I18NUtils.getClientMessage(i18NCode.SelectWaferInfo)}</h2>
                <Row gutter={20}>
                        <Col span={2} >
                            <span>01:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer1) => { this.wafer1 = wafer1 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>02:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer2) => { this.wafer2 = wafer2 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>03:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer3) => { this.wafer3 = wafer3 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>04:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer4) => { this.wafer4 = wafer4 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>05:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer5) => { this.wafer5 = wafer5 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                </Row>
                <Row gutter={20}>
                        <Col span={2} >
                            <span>06:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer6) => { this.wafer6 = wafer6 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>07:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer7) => { this.wafer7 = wafer7 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>08:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer8) => { this.wafer8 = wafer8 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>09:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer9) => { this.wafer9 = wafer9 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>10:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer10) => { this.wafer10 = wafer10 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                </Row>
                <Row gutter={20}>
                        <Col span={2} >
                            <span>11:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer11) => { this.wafer11 = wafer11 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>12:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer12) => { this.wafer12 = wafer12 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>13:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer13) => { this.wafer13 = wafer13 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>14:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer14) => { this.wafer14 = wafer14 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>15:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer15) => { this.wafer15 = wafer15 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                </Row>
                <Row gutter={20}>
                        <Col span={2} >
                            <span>16:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer16) => { this.wafer16 = wafer16 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>17:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer17) => { this.wafer17 = wafer17 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>18:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer18) => { this.wafer18 = wafer18 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>19:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer19) => { this.wafer19 = wafer19 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>20:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer20) => { this.wafer20 = wafer20 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                </Row>
                <Row gutter={20}>
                        <Col span={2} >
                            <span>21:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer21) => { this.wafer21 = wafer21 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>22:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer22) => { this.wafer22 = wafer22 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>23:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer23) => { this.wafer23 = wafer23 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>24:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer24) => { this.wafer24 = wafer24 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                        <Col span={2} >
                            <span>25:</span>
                        </Col>
                        <Col span={2}>
                            <Switch ref={(wafer25) => { this.wafer25 = wafer25 }} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
                        </Col>
                </Row>
            </div>
        )
    }

    setUnConfirmWaferTrackSetForm(waferInfo) {
        debugger;
        let self = this;
        let waferIdList = [];
        let serialNumber = waferInfo.serialNumber;
        let lotId = waferInfo.lotId;
        let testSite = waferInfo.testSite;
        let modelId = waferInfo.modelId;
        let exceptionClassify = waferInfo.exceptionClassify;
        let riskGrade = waferInfo.riskGrade;
        let waferId = waferInfo.waferId;
        if(self.serialNumber){
            self.serialNumber.setState({value: serialNumber});
        }
        if(self.lotId){
            self.lotId.setState({value: lotId});
        }
        if(self.testSite){
            self.testSite.setState({value: testSite});
        }
        if(self.modelId){
            self.modelId.setState({value: modelId});
        }
        if(self.exceptionClassify){
            self.exceptionClassify.setState({value: exceptionClassify});
        }
        if(self.riskGrade){
            self.riskGrade.setState({value: riskGrade});
        }
        if(waferId == null || waferId == "" || waferId == undefined){
            this.setWaferIdSelctFalse(self);
        } else {
            waferIdList = waferId.split(",");
            this.setWaferIdSelctFalse(self);
            waferIdList.forEach(wafer => {
                if(wafer == "01" && self.wafer1){
                    self.wafer1.rcSwitch.setState({checked: true});
                }
                if(wafer == "02" && self.wafer2){
                    self.wafer2.rcSwitch.setState({checked: true});
                }
                if(wafer == "03" && self.wafer3){
                    self.wafer3.rcSwitch.setState({checked: true});
                }
                if(wafer == "04" && self.wafer4){
                    self.wafer4.rcSwitch.setState({checked: true});
                }
                if(wafer == "05" && self.wafer5){
                    self.wafer5.rcSwitch.setState({checked: true});
                }
                if(wafer == "06" && self.wafer6){
                    self.wafer6.rcSwitch.setState({checked: true});
                }
                if(wafer == "07" && self.wafer7){
                    self.wafer7.rcSwitch.setState({checked: true});
                }
                if(wafer == "08" && self.wafer8){
                    self.wafer8.rcSwitch.setState({checked: true});
                }
                if(wafer == "09" && self.wafer9){
                    self.wafer9.rcSwitch.setState({checked: true});
                }
                if(wafer == "10" && self.wafer10){
                    self.wafer10.rcSwitch.setState({checked: true});
                }
                if(wafer == "11" && self.wafer11){
                    self.wafer11.rcSwitch.setState({checked: true});
                }
                if(wafer == "12" && self.wafer12){
                    self.wafer12.rcSwitch.setState({checked: true});
                }
                if(wafer == "13" && self.wafer13){
                    self.wafer13.rcSwitch.setState({checked: true});
                }
                if(wafer == "14" && self.wafer14){
                    self.wafer14.rcSwitch.setState({checked: true});
                }
                if(wafer == "15" && self.wafer15){
                    self.wafer15.rcSwitch.setState({checked: true});
                }
                if(wafer == "16" && self.wafer16){
                    self.wafer16.rcSwitch.setState({checked: true});
                }
                if(wafer == "17" && self.wafer17){
                    self.wafer17.rcSwitch.setState({checked: true});
                }
                if(wafer == "18" && self.wafer18){
                    self.wafer18.rcSwitch.setState({checked: true});
                }
                if(wafer == "19" && self.wafer19){
                    self.wafer19.rcSwitch.setState({checked: true});
                }
                if(wafer == "20" && self.wafer20){
                    self.wafer20.rcSwitch.setState({checked: true});
                }
                if(wafer == "21" && self.wafer21){
                    self.wafer21.rcSwitch.setState({checked: true});
                }
                if(wafer == "22" && self.wafer22){
                    self.wafer22.rcSwitch.setState({checked: true});
                }
                if(wafer == "23" && self.wafer23){
                    self.wafer23.rcSwitch.setState({checked: true});
                }
                if(wafer == "24" && self.wafer24){
                    self.wafer24.rcSwitch.setState({checked: true});
                }
                if(wafer == "25" && self.wafer25){
                    self.wafer25.rcSwitch.setState({checked: true});
                }
            });
        }
    }

    getWaferIdInfo(){
        let self = this;
        let waferId = "";
        if(self.wafer1.rcSwitch.state.checked){
            waferId = "01" + ",";
        }
        if(self.wafer2.rcSwitch.state.checked){
            waferId += "02" + ",";
        }
        if(self.wafer3.rcSwitch.state.checked){
            waferId += "03" + ",";
        }
        if(self.wafer4.rcSwitch.state.checked){
            waferId += "04" + ",";
        }
        if(self.wafer5.rcSwitch.state.checked){
            waferId += "05" + ",";
        }
        if(self.wafer6.rcSwitch.state.checked){
            waferId += "06" + ",";
        }
        if(self.wafer7.rcSwitch.state.checked){
            waferId += "07" + ",";
        }
        if(self.wafer8.rcSwitch.state.checked){
            waferId += "08" + ",";
        }
        if(self.wafer9.rcSwitch.state.checked){
            waferId += "09" + ",";
        }
        if(self.wafer10.rcSwitch.state.checked){
            waferId += "10" + ",";
        }
        if(self.wafer11.rcSwitch.state.checked){
            waferId += "11" + ",";
        }
        if(self.wafer12.rcSwitch.state.checked){
            waferId += "12" + ",";
        }
        if(self.wafer13.rcSwitch.state.checked){
            waferId += "13" + ",";
        }
        if(self.wafer14.rcSwitch.state.checked){
            waferId += "14" + ",";
        }
        if(self.wafer15.rcSwitch.state.checked){
            waferId += "15" + ",";
        }
        if(self.wafer16.rcSwitch.state.checked){
            waferId += "16" + ",";
        }
        if(self.wafer17.rcSwitch.state.checked){
            waferId += "17" + ",";
        }
        if(self.wafer18.rcSwitch.state.checked){
            waferId += "18" + ",";
        }
        if(self.wafer19.rcSwitch.state.checked){
            waferId += "19" + ",";
        }
        if(self.wafer20.rcSwitch.state.checked){
            waferId += "20" + ",";
        }
        if(self.wafer21.rcSwitch.state.checked){
            waferId += "21" + ",";
        }
        if(self.wafer22.rcSwitch.state.checked){
            waferId += "22" + ",";
        }
        if(self.wafer23.rcSwitch.state.checked){
            waferId += "23" + ",";
        }
        if(self.wafer24.rcSwitch.state.checked){
            waferId += "24" + ",";
        }
        if(self.wafer25.rcSwitch.state.checked){
            waferId += "25" + ",";
        }
        return waferId;
    }
    
    selectChange() {
        debugger;
        let self = this;
        if(this.validateWaferCheckedAll()){
            this.setWaferIdSelctFalse(self);
        } else {
            self.wafer1.rcSwitch.setState({checked: true});
            self.wafer2.rcSwitch.setState({checked: true});
            self.wafer3.rcSwitch.setState({checked: true});
            self.wafer4.rcSwitch.setState({checked: true});
            self.wafer5.rcSwitch.setState({checked: true});
            self.wafer6.rcSwitch.setState({checked: true});
            self.wafer7.rcSwitch.setState({checked: true});
            self.wafer8.rcSwitch.setState({checked: true});
            self.wafer9.rcSwitch.setState({checked: true});
            self.wafer10.rcSwitch.setState({checked: true});
            self.wafer11.rcSwitch.setState({checked: true});
            self.wafer12.rcSwitch.setState({checked: true});
            self.wafer13.rcSwitch.setState({checked: true});
            self.wafer14.rcSwitch.setState({checked: true});
            self.wafer15.rcSwitch.setState({checked: true});
            self.wafer16.rcSwitch.setState({checked: true});
            self.wafer17.rcSwitch.setState({checked: true});
            self.wafer18.rcSwitch.setState({checked: true});
            self.wafer19.rcSwitch.setState({checked: true});
            self.wafer20.rcSwitch.setState({checked: true});
            self.wafer21.rcSwitch.setState({checked: true});
            self.wafer22.rcSwitch.setState({checked: true});
            self.wafer23.rcSwitch.setState({checked: true});
            self.wafer24.rcSwitch.setState({checked: true});
            self.wafer25.rcSwitch.setState({checked: true});
        }
    }

    setWaferIdSelctFalse(self) {
        debugger;
        if(self.wafer1){
            self.wafer1.rcSwitch.setState({checked: false});
            self.wafer2.rcSwitch.setState({checked: false});
            self.wafer3.rcSwitch.setState({checked: false});
            self.wafer4.rcSwitch.setState({checked: false});
            self.wafer5.rcSwitch.setState({checked: false});
            self.wafer6.rcSwitch.setState({checked: false});
            self.wafer7.rcSwitch.setState({checked: false});
            self.wafer8.rcSwitch.setState({checked: false});
            self.wafer9.rcSwitch.setState({checked: false});
            self.wafer10.rcSwitch.setState({checked: false});
            self.wafer11.rcSwitch.setState({checked: false});
            self.wafer12.rcSwitch.setState({checked: false});
            self.wafer13.rcSwitch.setState({checked: false});
            self.wafer14.rcSwitch.setState({checked: false});
            self.wafer15.rcSwitch.setState({checked: false});
            self.wafer16.rcSwitch.setState({checked: false});
            self.wafer17.rcSwitch.setState({checked: false});
            self.wafer18.rcSwitch.setState({checked: false});
            self.wafer19.rcSwitch.setState({checked: false});
            self.wafer20.rcSwitch.setState({checked: false});
            self.wafer21.rcSwitch.setState({checked: false});
            self.wafer22.rcSwitch.setState({checked: false});
            self.wafer23.rcSwitch.setState({checked: false});
            self.wafer24.rcSwitch.setState({checked: false});
            self.wafer25.rcSwitch.setState({checked: false});
        }
    }

    validateWaferCheckedAll(){
        let self = this;
        let falg = false;
        if(self.wafer1.rcSwitch.state.checked && self.wafer2.rcSwitch.state.checked && self.wafer3.rcSwitch.state.checked &&
            self.wafer4.rcSwitch.state.checked && self.wafer5.rcSwitch.state.checked && self.wafer6.rcSwitch.state.checked && 
            self.wafer7.rcSwitch.state.checked && self.wafer8.rcSwitch.state.checked && self.wafer9.rcSwitch.state.checked && 
            self.wafer10.rcSwitch.state.checked && self.wafer11.rcSwitch.state.checked && self.wafer12.rcSwitch.state.checked && 
            self.wafer13.rcSwitch.state.checked && self.wafer14.rcSwitch.state.checked && self.wafer15.rcSwitch.state.checked &&
            self.wafer16.rcSwitch.state.checked && self.wafer17.rcSwitch.state.checked && self.wafer18.rcSwitch.state.checked && 
            self.wafer19.rcSwitch.state.checked && self.wafer20.rcSwitch.state.checked && self.wafer21.rcSwitch.state.checked &&
            self.wafer22.rcSwitch.state.checked && self.wafer23.rcSwitch.state.checked && self.wafer24.rcSwitch.state.checked && 
            self.wafer25.rcSwitch.state.checked){
                falg = true;
        }
        return falg;
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    },
};