
import EntityListTable from '@components/framework/table/EntityListTable';
import { i18NCode } from '@api/const/i18n';
import AuthorityButton from '@components/framework/button/AuthorityButton';

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
        EventUtils.getEventEmitter().emit(EventUtils.getEventNames().ParentTableRowSelected, this, record, this.props.rowKey);
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
            if (selectdRow.status == "UnFrozen") {
                buttonDisable = false;
            } else if (selectdRow.status == "Frozen"){
                icon = "icon-unfrozen";
                buttonCode = i18NCode.BtnUnFrozen;
                buttonDisable = false;
            }
        }
        let buttonKey = buttonCode;
        return <AuthorityButton i18NCode={buttonCode} disabled={buttonDisable} key={buttonKey} type="primary" icon={icon} onClick={() => this.handleAdd()}/>
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
            if (selectdRow.status == "Active") {
                buttonDisable = false;
            } else if (selectdRow.status == "InActive"){
                icon = "icon-inactive";
                buttonCode = i18NCode.BtnInActive;
                buttonDisable = false;
            }
        }
        let buttonKey = buttonCode;
        return <AuthorityButton i18NCode={buttonCode} disabled={buttonDisable}  key={buttonKey} type="primary"  icon={icon} onClick={() => this.handleAdd()}/>
    }

}


