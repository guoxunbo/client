import {Component} from "react";
import I18NUtils from "@api/utils/I18NUtils";
import { i18NCode } from "@api/const/i18n";
import { Modal } from "antd";
import { Application } from "@api/Application";
import DispatchAuthorityForm from "../form/DispatchAuthorityForm";

export default class DispatchAuthorityDialog extends Component {

    static displayName = 'DispatchAuthorityDialog';

    constructor(props) {
      super(props);
      const{authorities, checkedKeys, roleAuthorities} = this.props;

      this.state = {
        authorities: authorities,
        checkedKeys: checkedKeys,
        roleAuthorities: roleAuthorities,
      }
    }

    buildForm = () => {
        return <DispatchAuthorityForm ref={(dispatchForm) => { this.dispatchForm = dispatchForm }}  authorities={this.props.authorities} checkedKeys={this.props.checkedKeys} roleAuthorities={this.props.roleAuthorities}/>
    }

    handleOk = () => {
      const {roleAuthorities} = this.dispatchForm.state;
      if (this.props.onOk) {
        this.props.onOk(roleAuthorities);
      }
    }

    render() {
        return (
            <div>
                <Modal width={Application.dispatchForm.modalWidth} 
                        centered title={I18NUtils.getClientMessage(i18NCode.Edit)} 
                        object={this.props.object} visible={this.props.visible} 
                    maskClosable={false} onOk={this.handleOk} onCancel={this.props.onCancel} 
                    okText={I18NUtils.getClientMessage(i18NCode.Ok)} 
                    cancelText={I18NUtils.getClientMessage(i18NCode.Cancel)}>
                    {this.buildForm()}
                </Modal>
            </div>
        );
    }

}