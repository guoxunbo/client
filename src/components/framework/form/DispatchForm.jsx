import {Component} from "react";
import I18NUtils from "@api/utils/I18NUtils";
import { i18NCode } from "@api/const/i18n";
import { Transfer } from "antd";
import * as PropTypes from 'prop-types';
import { Application } from "@api/Application";

/**
 * DispatchForm
 * 具有左右互移功能
 */
export default class DispatchForm extends Component {

    static displayName = 'DispatchForm';

    constructor(props) {
        super(props);
        const{dataSource, targetKeys } = this.props;
        this.state={
            dataSource:dataSource,
            targetKeys:targetKeys
        }
    }
    
    buildForm = () => {
        const{dataSource, targetKeys } = this.state;
        return (<Transfer showSearch 
                        dataSource={dataSource} 
                        targetKeys={targetKeys}
                        listStyle={{
                            width: Application.dispatchForm.width,
                            height: Application.dispatchForm.height,
                        }}
                        locale={{
                            itemUnit: I18NUtils.getClientMessage(i18NCode.TransferItem),
                            itemsUnit: I18NUtils.getClientMessage(i18NCode.TransferItems),
                            notFoundContent: I18NUtils.getClientMessage(i18NCode.TransferNotFoundContent),
                            searchPlaceholder: I18NUtils.getClientMessage(i18NCode.TransferSearchPlaceholder),
                        }}
                        onChange={this.handleChange}
                        titles={[I18NUtils.getClientMessage(i18NCode.TransferSource), I18NUtils.getClientMessage(i18NCode.TransferTarget)]}
                        render={item => `${item.title}-${item.description}`}/>)
    }

    handleChange = (targetKeys) => {
        this.setState({ targetKeys });
    }

    render() {
        return (
            <div>
                {this.buildForm()}
            </div>
        );
    }
}
DispatchForm.prototypes = {
    dataSource: PropTypes.array, // 所有数据
    targetKeys: PropTypes.array, // 已经选择数据
}
