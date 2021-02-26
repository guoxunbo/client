import RefTableField from './RefTableField';

export default class SelectPoField extends RefTableField {

    static displayName = 'SelectPoField';
    refTable;

    valueChanged = (sender, value) => {
        if(sender === this){
            return;
        }
        let materialNames = []; 
        this.props.materialLots.map(materialLot => {
            materialNames.push(materialLot.materialName);
        });
        let senderField = sender.props.field;
        if (sender instanceof RefTableField) {
            let refTable = this.refTable;
            if (refTable && refTable.whereClause) {
                debugger;
                let whereClause = refTable.whereClause;
                // 如果包含了parameter则替换
                if (whereClause.indexOf(":") != -1) {
                    whereClause = whereClause.formatValue(senderField.name, value);
                }

                let parameters = {};
                parameters[senderField.name] = value;
                parameters["materialName"] = materialNames;
                this.queryData(parameters);
            }
        }
    }

}
