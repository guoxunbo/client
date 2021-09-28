import EntityDialog from '@components/framework/dialog/EntityDialog';

export default class CreateIssueOrderDialog extends EntityDialog {
    static displayName = 'CreateIssueOrderDialog';

    handleSave = () => {
        this.props.onOk(this.props.object);
    }
}


