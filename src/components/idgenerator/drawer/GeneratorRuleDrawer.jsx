import  React from 'react';

import EntityDrawer from '@components/framework/drawer/EntityDrawer';
import GeneratorRuleForm from '@components/idgenerator/form/GeneratorRuleForm';

export default class GeneratorRuleDrawer extends EntityDrawer {
    static displayName = 'GeneratorRuleDrawer';

    buildForm = () =>  {
        return <GeneratorRuleForm ref={(form) => this.entityForm = form} object={this.props.object} table={this.props.table}/>
    }

}