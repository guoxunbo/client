import { Button, Form } from 'antd';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import NoticeUtils from '@utils/NoticeUtils';
import PackCaseCheckForm from '@components/gc/form/PackCaseCheckForm';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import MaterialLotManagerRequest from '@api/gc/material-lot-manager/MaterialLotManagerRequest';

const PackCaseCheckTableName="GCPackCaseCheck";

export default class PackCaseCheckTable extends EntityScanViewTable {

    static displayName = 'PackCaseCheckTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{formTable: {fields: []}}};
    }

    buildOperationColumn = () => {
    }
    
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createJudgePassButton());
        buttons.push(this.createJudgeNgButton());
        return buttons;
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
        let object = {
            packedLotDetails : selectedRows,
            success: function(responseBody) {
                self.judgeSuccess()
            }
        }
        MaterialLotManagerRequest.sendJudgePackedMaterialLotRequest(object);
    }

    judgeNg = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
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
        return <Button key="judgePass" type="primary" className="table-button" icon="inbox" onClick={this.judgePass}>
                        Pass
                    </Button>
    }

    createJudgeNgButton = () => {
        return <Button key="judgeNg" type="primary" className="table-button" icon="inbox" onClick={this.judgeNg}>
                        NG
                    </Button>
    }
}


