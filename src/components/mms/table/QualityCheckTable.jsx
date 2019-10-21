
import { Button } from 'antd';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import NoticeUtils from '@utils/NoticeUtils';
import MessageUtils from '@api/utils/MessageUtils';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import QualityCheckItemDialog from '@components/mms/dialog/QualityCheckItemDialog';

const QualityCheckTableName="COMQualityCheck";

export default class QualityCheckTable extends EntityScanViewTable {

    static displayName = 'QualityCheckTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{formTable: {fields: []}}};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createJudgeOkButton());
        buttons.push(this.createJudgeNgButton());
        return buttons;
    }

    createForm = () => {
        return  <QualityCheckItemDialog checkItemList={this.props.checkItemList} ref={this.formRef} object={this.state.data} visible={this.state.formVisible} 
                                            table={this.state.formTable} onOk={this.judgeSuccess} onCancel={this.handleCancel} />
    }
    
    /**
     * 判定之后的回调函数
     */
    judgeSuccess = () => {
        this.setState({formVisible : false});
        if (this.props.resetData) {
            this.props.resetData();
        }
        MessageUtils.showOperationSuccess();
    }

    /**
     * 各自的判定调用不同的接口 需要各自业务实现
     *  调用成功之后务必调用judgeSuccess进行清空数据
     */
    judgeOk = () => {
        
    }

    judgeNg = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let requestObject = {
            name: QualityCheckTableName,
            success: function(responseBody) {
                self.setState({
                    formTable: responseBody.table,
                    formVisible : true
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    createJudgeOkButton = () => {
        return <Button key="OK" type="primary" className="table-button" icon="inbox" onClick={this.judgeOk}>
                        OK
                    </Button>
    }

    createJudgeNgButton = () => {
        return <Button key="NG" type="primary" className="table-button" icon="inbox" onClick={this.judgeNg}>
                        NG
                    </Button>
    }
}


