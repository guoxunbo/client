
import { i18NCode } from '../../../../api/const/i18n';
import I18NUtils from '../../../../api/utils/I18NUtils';
import EntityScanProperties from '../entityProperties/EntityScanProperties';

/**
 * 手机模式的properties
 */
export default class MobileProperties extends EntityScanProperties{

    static displayName = 'MobileProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{searchTxt: I18NUtils.getClientMessage(i18NCode.BtnSearch), 
                        formObject: undefined,
                        showQueryFormButton: false}};
    }

    buildTable = () => {
    }

    getFields(fields) {
        
    }

    buildMobileForm = () => {
        return (<WrappedAdvancedMobileForm ref={(form) => this.mobileForm = form} 
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }
    
    buildOtherComponent = () => {
        return (<div>
                    {this.buildMobileForm()}
                </div>);
    }

}
