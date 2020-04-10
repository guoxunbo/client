import React from 'react';
import {WrappedAdvancedEntityForm} from '@components/framework/form/EntityForm';
import EntityDialog from '@components/framework/dialog/EntityDialog';
import EqpRecipeRequest from '@api/rms/eqp-recipe-manager/EqpRecipeRequest';

export default class EqpRecipeDialog extends EntityDialog {
    
    static displayName = 'EqpRecipeDialog';

    handleSave = (formObject) => {
        var self = this;
        let object = {
            values: formObject,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.recipeEquipment);
                }
            }
        };
        EqpRecipeRequest.sendMergeRequest(object);
    }

    buildForm = () =>  {
       return <WrappedAdvancedEntityForm ref={(form) => this.entityForm = form} object={this.props.object} table={this.props.table}/>
    }
}


