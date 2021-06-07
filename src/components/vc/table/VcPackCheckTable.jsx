import { Button, Form } from 'antd';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import NoticeUtils from '@utils/NoticeUtils';
import PackCheckRequest from '@api/pack-check/PackCheckRequest';
import VcPackCheckDialog from '../dialog/VcPackCheckDialog';
import MaterialLotAction from '@api/dto/mms/MaterialLotAction';

const ActionCode = {
    OK: "OK",
    NG: "NG",
}
export default class VcPackCheckTable extends EntityScanViewTable {

    static displayName = 'VcPackCheckTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{formTable: {fields: []}}, materialLots: []};
    }

    buildOperationColumn = () => {
    }
    
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createJudgePassButton());
        buttons.push(this.createJudgeNgButton());
        return buttons;
    }

    judgeSuccess = () => {
        this.setState({formVisible : false});
        if (this.props.resetData) {
            this.props.resetData();
        }
        NoticeUtils.showSuccess();
    }

    judgePass = () => {
        var self = this;
        const {data, selectedRows} = this.state;
        if (!data || data.length === 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        if (this.props.scanErrorFlag) {
            NoticeUtils.showNotice("出现过扫描错误，请重新查找并重新扫描");
            return;
        }
        if (selectedRows.length != data.length) {
            NoticeUtils.showNotice("数据没有全部扫描");
            return;
        }
        let packCheckAction = new MaterialLotAction();
        packCheckAction.setMaterialLotId(selectedRows[0].boxMaterialLotId);
        packCheckAction.setActionCode(ActionCode.OK);
        let object = {
            packCheckAction : packCheckAction,
            success: function(responseBody) {
                self.judgeSuccess()
            }
        }
        PackCheckRequest.sendPackCheckRequest(object);
    }

    createJudgePassButton = () => {
        return <Button key="judgePass" type="primary" className="table-button" icon="inbox" onClick={this.judgePass}>
                        Pass
                    </Button>
    }

    createJudgeNgButton = () => {
        return <Button key="judgeNg" type="primary" className="table-button" icon="inbox" onClick={this.judgeNg}>
                        NG
                    </Button>
    }


    judgeNg =() => {
        const {data, selectedRows} = this.state;
        if (selectedRows.length != data.length) {
            NoticeUtils.showNotice("数据没有全部扫描");
            return;
        }
        let actionTable = this.props.packCheckActionTable;
        this.setState({
            formVisible: true,
            materialLots: selectedRows,
            formObject: {},
            packCheckActionTable : actionTable,
        });
    }

    createForm = () => {
        return  <VcPackCheckDialog key={VcPackCheckDialog.displayName} ref={this.formRef} object={this.state.formObject} materialLots = {this.state.materialLots} visible={this.state.formVisible} 
                                            table={this.state.packCheckActionTable} onOk={this.refresh} onCancel={this.handleCancel} />
    }

    refresh = (data) => {
        this.setState({
            formObject: {},
            materialLots:[],
            formVisible: false
        });
        this.props.resetData();
        NoticeUtils.showSuccess();
    }

    handleCancel = () => {
        this.setState({
            formVisible: false
        });
    }
}


