import EntityScanViewTable from '../EntityScanViewTable';

export default class MobileIRAUnPackageTable extends EntityScanViewTable {

    static displayName = 'MobileIRAUnPackageTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    getRowClassName = (record, index) => {
        if (record.scanFlag) {
            return 'new-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

}