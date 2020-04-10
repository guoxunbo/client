import EntityListTable from '@components/framework/table/EntityListTable';
import { i18NCode } from '@api/const/i18n';
import AuthorityButton from '@components/framework/button/AuthorityButton';
import EntityManagerRequest from '@api/entity-manager/EntityManagerRequest';
import { DefaultStatusList } from '@const/ConstDefine';

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
    }

    hasEditBtnAuthority = (record) => {
        if (record.status == DefaultStatusList.UnFrozen) {
           return true
        }
        return false;
    }

    hasDeleteBtnAuthority = (record) => {
        if (record.status == DefaultStatusList.UnFrozen) {
            return true
         }
         return false;
    }

    isTableTabReadOnly = (selectedObject) => {
        if (selectedObject.status == DefaultStatusList.UnFrozen) {
            selectedObject["readonly"] = false;
        } else {
            selectedObject["readonly"] = true;
        }
        return selectedObject;
    }

    handleStatusChanged = (event) => {
        const self = this;
        const {selectedRows}  = this.state;
        let object = {
            modelClass : self.state.table.modelClass,
            values: selectedRows[0],
            actionType: event,
            success: function(responseBody) {
                let dataList = [];
                let data = responseBody.data;
                dataList.push(data);
                if (data.effectObject) {
                    dataList.push(data.effectObject);
                }
                self.refresh(dataList);
            }
        };
        EntityManagerRequest.sendStatusChangedRequest(object);
    }
    
    handleFrozen = () => {
        this.handleStatusChanged(DefaultStatusList.Frozen);
    }

    handleUnFrozen = () => {
        this.handleStatusChanged(DefaultStatusList.UnFrozen);
    }

    handleUnFrozenOrFrozen = (buttonCode) => {
        if (buttonCode === DefaultStatusList.Frozen) {
            this.handleFrozen();
        } else if (buttonCode === DefaultStatusList.UnFrozen) {
            this.handleUnFrozen();
        }
    }

    handleActive = () => {
        this.handleStatusChanged(DefaultStatusList.Active);
    }

    handleInActive = () => {
        this.handleStatusChanged(DefaultStatusList.InActive);
    }

    handleActiveOrInActive = (buttonCode) => {
        if (buttonCode === DefaultStatusList.Active) {
            this.handleActive();
        } else if (buttonCode === DefaultStatusList.InActive) {
            this.handleInActive();
        }
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
            if (selectdRow.status == DefaultStatusList.InActive) {
                buttonDisable = false;
            } else if (selectdRow.status == DefaultStatusList.UnFrozen) {
                buttonDisable = false;
            } else if (selectdRow.status == DefaultStatusList.Frozen){
                icon = "icon-unfrozen";
                buttonCode = i18NCode.BtnUnFrozen;
                buttonDisable = false;
            }
        }
        let buttonKey = buttonCode;
        return <AuthorityButton i18NCode={buttonCode} disabled={buttonDisable} key={buttonKey} icon={icon} onClick={() => this.handleUnFrozenOrFrozen(buttonCode)}/>
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
            if (selectdRow.status == DefaultStatusList.Frozen) {
                buttonDisable = false;
            } else if (selectdRow.status == DefaultStatusList.Active) {
                buttonDisable = false;
                icon = "icon-inactive";
                buttonCode = i18NCode.BtnInActive;
                buttonDisable = false;
            } else if (selectdRow.status == DefaultStatusList.InActive){
                buttonDisable = false;
            }
        }
        let buttonKey = buttonCode;
        return <AuthorityButton i18NCode={buttonCode} disabled={buttonDisable} key={buttonKey} icon={icon} onClick={() => this.handleActiveOrInActive(buttonCode)}/>
    }

}


