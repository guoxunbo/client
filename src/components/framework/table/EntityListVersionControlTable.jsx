
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
        this.state= {...this.state, oprationColumnWidth:200}
    }
    /**
     * 创建btn组。不同的table对button的组合要求不一样时。可以重载其方法做处理
     */
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        return buttons;
    }
    
    buildOperation = (record) => {
        let operations = [];
        operations.push(this.buildEditButton(record));
        operations.push(this.createUnForzenButton(record));
        operations.push(this.createForzenButton(record));
        operations.push(this.buildDeletePopConfirm(record));
        return operations;
    }

    createUnForzenButton = (record) => {
        return <AuthorityButton key="edit" style={{marginRight:'1px'}} icon="edit" inRow
                    onClick={() => this.handleEdit(record)} size="small" href="javascript:;"/>;
    }

    createForzenButton = (record) => {
        return <AuthorityButton key="edit" style={{marginRight:'1px'}} icon="edit" inRow
                    onClick={() => this.handleEdit(record)} size="small" href="javascript:;"/>;
    }

    createActiveButton = (record) => {
        return <AuthorityButton key="edit" style={{marginRight:'1px'}} icon="edit" inRow
                    onClick={() => this.handleEdit(record)} size="small" href="javascript:;"/>;
    }

    createInActiveButton = (record) => {
        return <AuthorityButton key="edit" style={{marginRight:'1px'}} icon="edit" inRow
                    onClick={() => this.handleEdit(record)} size="small" href="javascript:;"/>;
    }
    // createUnForzenButton = () => {
    //     return <AuthorityButton i18NCode={i18NCode.BtnUnForzen} key="add" type="primary" className="table-button" icon="icon-unforzen" onClick={() => this.handleAdd()}/>
    // }

    // createForzenButton = () => {
    //     return <AuthorityButton i18NCode={i18NCode.BtnForzen} key="add" type="primary" className="table-button" icon="icon-forzen" onClick={() => this.handleAdd()}/>
    // }

    // createActiveButton = () => {
    //     return <AuthorityButton i18NCode={i18NCode.BtnActive} key="add" type="primary" className="table-button" icon="icon-active" onClick={() => this.handleAdd()}/>
    // }

    // createInActiveButton = () => {
    //     return <AuthorityButton i18NCode={i18NCode.BtnInActive} key="add" type="primary" className="table-button" icon="icon-inactive" onClick={() => this.handleAdd()}/>
    // }
}


