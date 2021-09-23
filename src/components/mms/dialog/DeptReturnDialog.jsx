import EntityDialog from '@components/framework/dialog/EntityDialog';

export default class DeptReturnDialog extends EntityDialog {
    static displayName = 'DeptReturnDialog';

    handleSave = () => {
        this.props.onOk(this.props.object);
    }

    
}


