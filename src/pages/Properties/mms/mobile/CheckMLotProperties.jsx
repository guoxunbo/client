import CheckMLotRequest from "@api/vc/check-mlot-manager/CheckMLotRequest";
import AuthorityButton from "@components/framework/button/AuthorityButton";
import MobileTable from "@components/framework/table/MobileTable";
import { WrappedCheckMLotForm } from "@components/mms/form/mobile/CheckMLotForm";
import { i18NCode } from "@const/i18n";
import MobileProperties from "@properties/framework/MobileProperties";
import I18NUtils from "@utils/I18NUtils";
import IconUtils from "@utils/IconUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Col, Button, Form, Row } from "antd";
import { Modal } from "antd-mobile";

const HandleType = {
    Check: "Check",
    Recheck: "Recheck",
}
export default class CheckMLotProperties extends MobileProperties{

    static displayName = 'CheckMLotProperties';
    
    buildMobileForm = () => {
        return (<WrappedCheckMLotForm
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }

    buildTable = () => {
        return <MobileTable ref={(dataTable) => { this.dataTable = dataTable }} {...this.getDefaultTableProps()} tableRrn={this.state.tableRrn} pagination={false} showScanedQtyFlag= {true}/>
    }

    buildButtons = () => {
        return (<Row> 
                    <Col key="CheckMLotBtn" span={7} className="table-button">
                        <Form.Item>
                            <Button type="primary" onClick={()=>this.handleSubmit(() => this.validateCheck(), HandleType.Check)}>
                                {IconUtils.buildIcon("icon-pandian")}{I18NUtils.getClientMessage(i18NCode.BtnCheckMLot)}
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col key="RestDataBtn" span={6} className="table-button">
                        <Form.Item>
                            <Button type="primary" onClick={this.handleReset}> 
                            {IconUtils.buildIcon("redo")}{I18NUtils.getClientMessage(i18NCode.BtnReset)}
                            </Button>
                        </Form.Item>
                    </Col>  
                    <Col key="RecheckBtn" span={6} className="table-button">
                        <Form.Item>
                            <AuthorityButton key="AdvancedMobileRecheckMLot" name="AdvancedMobileRecheckMLot" 
                            type="primary" disabled={true} onClick={()=>this.handleSubmit(() => this.validateReCheck(), HandleType.Recheck)} icon="icon-pandian" 
                            i18NCode={I18NUtils.getClientMessage(i18NCode.BtnRecheckMLot)} />
                        </Form.Item>
                    </Col>
                </Row>)
    }

    handleSubmit = (validateFunc, handleType) => {
        let self = this;
        let {data} = self.dataTable.state;
        let scanedMLots = data.filter((d) => d.scaned && d.scaned === true);
        if(scanedMLots.length != data.length){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseScanAll));
            return;
        }

        let documentLine = validateFunc();
        if(documentLine == undefined || !documentLine) return;

        self.setState({loading:true})
        let errorMLots = data.filter((d) => d.errorFlag && d.errorFlag === true);
        if(errorMLots.length > 0){
            this.buildModal(() => this.handleModalOK(documentLine, scanedMLots, handleType));
        }else{
            this.handleModalOK(documentLine, scanedMLots, handleType)
        }
    }

    validateCheck = () => {
        let documentLine = this.props.dataTable.getSingleSelectedRow();
        if (!documentLine) return;

        if (documentLine.status && documentLine.status != 'Approve'){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.CannotCheck))
            return;
        }
        return documentLine;
    }

    validateReCheck = () => {
        let documentLine = this.props.dataTable.getSingleSelectedRow();
        if(!documentLine) return; 
        
        if (documentLine.status && documentLine.status != 'WaitRecheck'){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.CannotReCheck))
            return 
        }
        return documentLine;
    }

    buildModal = ( handleModalOK ) => {
        Modal.alert(
            "警告",
            I18NUtils.getClientMessage("当前数量和扫描数量不一致"),
            [
                {text: I18NUtils.getClientMessage(i18NCode.Cancel), onPress: () => this.handleModalCancel()},
                {text: I18NUtils.getClientMessage(i18NCode.Ok), onPress: () => handleModalOK() }
            ],
        )
    }

    handleModalCancel = () =>{
        this.setState({loading: false})
    }

    handleModalOK = (documentLine, scanedMaterialLots, handleType) =>{
        let self = this;
        let requestObject = {
            documentLine: documentLine,
            materialLots: scanedMaterialLots,
            success: function() {
                self.setState({ loading: false });
                self.handleReset();
                self.props.onSearch();
                NoticeUtils.mobileShowSuccess(undefined, 'bottomRight');
            }
        }
        if(HandleType.Check == handleType){
            CheckMLotRequest.sendCheckMLotByOrderRequest(requestObject);
        }else if(HandleType.Recheck == handleType){
            CheckMLotRequest.sendRecheckMLotByOrderRequest(requestObject);
        }
    }
}
