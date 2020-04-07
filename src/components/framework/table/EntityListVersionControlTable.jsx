
import EntityListTable from '@components/framework/table/EntityListTable';
import { i18NCode } from '@api/const/i18n';
import AuthorityButton from '@components/framework/button/AuthorityButton';
import EntityManagerRequest from '@api/entity-manager/EntityManagerRequest';

/**
 * 具备版本管控的基础表格
 */
export default class EntityListVersionControlTable extends EntityListTable {

    static displayName = 'EntityListVersionControlTable';

    constructor(props) {
        super(props);
        this.state= {...this.state, }
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        buttons.push(this.createUnForzenOrForzenButton());
        buttons.push(this.createActiveOrInActiveButton());

        return buttons;
    }
    
    selectRow = (record) => {
        let selectedRows = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        // 发送事件变化
        // EventUtils.getEventEmitter().emit  (EventUtils.getEventNames().ParentTableRowSelected, this, record, this.props.rowKey);
    }

    handleStatusChanged = (buttonCode) => {
        const self = this;
        const {selectedRows}  = this.state;

        let object = {
            modelClass : self.state.table.modelClass,
            values: selectedRows[0],
            actionType: buttonCode,
            success: function(responseBody) {
                self.refresh(responseBody.data);
            }
        };
        EntityManagerRequest.sendStatusChangedRequest(object);
    }
    
    handleUnFrozenOrFrozen = (buttonCode) => {
        this.handleStatusChanged(buttonCode);
    }

    handleActiveOrInActive = (buttonCode) => {
        this.handleStatusChanged(buttonCode);
    }

    /**
     * 冻结或者解冻按钮
     */
    createUnForzenOrForzenButton = () => {
        const {selectedRows}  = this.state;
        let icon = "icon-forzen";
        let buttonCode = i18NCode.BtnFrozen;
        let buttonDisable = true;
        if (selectedRows && selectedRows.length > 0 ) {
            let selectdRow = selectedRows[0];
            if (selectdRow.status == "InActive") {
                buttonDisable = false;
            } else if (selectdRow.status == "UnFrozen") {
                buttonDisable = false;
            } else if (selectdRow.status == "Frozen"){
                icon = "icon-unfrozen";
                buttonCode = i18NCode.BtnUnFrozen;
                buttonDisable = false;
            }
        }
        let buttonKey = buttonCode;
        return <AuthorityButton i18NCode={buttonCode} disabled={buttonDisable} key={buttonKey} type="primary" icon={icon} onClick={() => this.handleUnFrozenOrFrozen(buttonCode)}/>
    }

    /**
     * 激活或者失效按钮
     */
    createActiveOrInActiveButton = () => {
        const {selectedRows}  = this.state;
        let icon = "icon-active";
        let buttonCode = i18NCode.BtnActive;
        let buttonDisable = true;
        if (selectedRows && selectedRows.length > 0 ) {
            let selectdRow = selectedRows[0];
            if (selectdRow.status == "Frozen") {
                buttonDisable = false;
            } else if (selectdRow.status == "Active") {
                buttonDisable = false;
                icon = "icon-inactive";
                buttonCode = i18NCode.BtnInActive;
                buttonDisable = false;
            } else if (selectdRow.status == "InActive"){
                buttonDisable = false;
            }
        }
        let buttonKey = buttonCode;
        return <AuthorityButton i18NCode={buttonCode} disabled={buttonDisable}  key={buttonKey} type="primary"  icon={icon} onClick={() => this.handleActiveOrInActive(buttonCode)}/>
    }

}


