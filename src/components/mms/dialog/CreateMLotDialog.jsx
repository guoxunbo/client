import EntityDialog from '@components/framework/dialog/EntityDialog';

export default class CreateMLotDialog extends EntityDialog {
    static displayName = 'CreateMLotDialog';

    handleSave = () => {
        this.props.onOk(this.props.object);
    }
}


