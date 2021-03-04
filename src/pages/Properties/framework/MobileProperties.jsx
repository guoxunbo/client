import EntityScanProperties from "@properties/framework/EntityScanProperties";
import {WrappedAdvancedMobileForm} from '@components/framework/form/MobileForm';

import I18NUtils from "@utils/I18NUtils";
import { i18NCode } from "@const/i18n";

/**
 * 手机模式的properties
 * 不展示table。只展示栏位。
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
