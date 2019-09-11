import EntityScanViewTable from '../EntityScanViewTable';

/**
 * 格科盘点表
 */
export default class CheckTable extends EntityScanViewTable {

    static displayName = 'CheckTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{formTable: {fields: []}}};
    }

    createButtonGroup = () => {
       
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
