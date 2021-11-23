
import { Button, Col, Divider, Form } from 'antd';
import { DefaultRowKey } from '../../../../api/const/ConstDefine';
import { i18NCode } from '../../../../api/const/i18n';
import I18NUtils from '../../../../api/utils/I18NUtils';
import { WrappedAdvancedMobileForm } from '../../../../components/Form/MobileForm';
import { Notification } from '../../../../components/notice/Notice';
import MobileTable from '../../../../components/Table/MobileTable';
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
                        showQueryFormButton: false,
                      rowKey: DefaultRowKey}};
    }

    buildTable = () => {
      return <MobileTable ref={(dataTable) => { this.dataTable = dataTable }}  table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

    showDataNotFound = () => {
      this.setState({ 
        loading: false
      });
      Notification.showInfo(I18NUtils.getClientMessage(i18NCode.DataNotFound));
    }

    getFields(fields) {
        
    }

    buildMobileForm = () => {
        return (<WrappedAdvancedMobileForm 
                    ref={(form) => this.mobileForm = form} 
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}
                    onSearch={this.handleSearch.bind(this)}
                    wrappedComponentRef={(form) => this.form = form} 
                    />);
    }
    
    buildOtherComponent = () => {
        return (<div>
                    {this.buildMobileForm()}
                </div>);
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
          <Col span={10} className="table-button">
              <Form.Item key="submitBtn" >
                  <Button block type="primary" onClick={this.handleSubmit}>{I18NUtils.getClientMessage(i18NCode.Ok)}</Button>
              </Form.Item>
          </Col>
      );
      buttons.push(
          <Col span={10} className="table-button">
              <Form.Item key="returnBtn" >
                  <Button block type="primary" onClick={this.handleReset}>{I18NUtils.getClientMessage(i18NCode.BtnReset)}</Button>
              </Form.Item>
          </Col>
      );
      return buttons;
  }

  render() {
    let showQueryFormButton = this.state.showQueryFormButton;
    if (showQueryFormButton === undefined) {
        showQueryFormButton = true;
    }
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
