import EntityScanProperties from "@properties/framework/EntityScanProperties";
import {WrappedAdvancedMobileForm} from '@components/framework/form/MobileForm';
import MobileTable from '@components/framework/table/MobileTable';

import I18NUtils from "@utils/I18NUtils";
import { i18NCode } from "@const/i18n";
import { Col, Divider, Form } from "antd";
import { Button } from "antd-mobile";

/**
 * 手机模式的properties
 * table从url的parameter1上取值，table不具备分页
 */
export default class MobileProperties extends EntityScanProperties{

    static displayName = 'MobileProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{searchTxt: I18NUtils.getClientMessage(i18NCode.BtnSearch), 
                        formObject: undefined}};
    }

    buildTable = () => {
        let parameters = this.state.parameters;
        if (!parameters || !parameters.parameter1) {
            return;
        }
        return <MobileTable ref={(dataTable) => { this.dataTable = dataTable }} {...this.getDefaultTableProps()}  tableRrn={parameters.parameter1} pagination={false} />
    }

    buildMobileForm = () => {
        return (<WrappedAdvancedMobileForm 
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form} 
                    ref={(form) => this.form = form} 
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table} />);
    }
    
    handleSubmit = () => {
    }
    
    handleReset = () => {
        this.setState({ 
          tableData: [],
          loading: false
        });
        this.form.resetFormFileds();
    }

    buildButtons = () => {
        let buttons = [];
        buttons.push(
            <Col key="submitBtn" span={10} className="table-button">
                <Form.Item >
                    <Button type="primary" onClick={this.handleSubmit}>{I18NUtils.getClientMessage(i18NCode.Ok)}</Button>
                </Form.Item>
            </Col>
        );
        buttons.push(
            <Col key="returnBtn" span={10} className="table-button">
                <Form.Item>
                    <Button type="primary" onClick={this.handleReset}>{I18NUtils.getClientMessage(i18NCode.BtnReset)}</Button>
                </Form.Item>
            </Col>
        );
        return buttons;
    }

    buildOtherComponent = () => {
        return (<div>
                    {this.buildMobileForm()}
                </div>);
    }

    render() {
        return (
          <div className="properties-page">
            <div className="router-body">
              {this.buildOtherComponent()}
              {this.buildTable()}
              <Divider/>
              {this.buildButtons()}
            </div>
          </div>
        );
      }
}
