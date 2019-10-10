import React, { Component } from 'react';

import EntityListTable from '@components/framework/table/EntityListTable';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import { BackTop, Divider } from 'antd';
import WrappedAdvancedQueryForm from '@components/framework/form/QueryForm';
import { DefaultRowKey } from '@api/const/ConstDefine';

/**
 * 系统最基层的页面表单。
 */
export default class EntityProperties extends Component {
  
    static displayName = 'EntityProperties';

    constructor(props) {
      super(props);
      let tableRrn = this.props.tableRrn;
      if (!tableRrn) {
        tableRrn = this.props.match.params.tableRrn;
      }
      this.state = {
        tableRrn : tableRrn,
        tableData: [],
        table: {fields: []},
        loading: true,
        selectedRowKeys:[],
        selectedRows:[],
        rowKey: DefaultRowKey
      };
    }

    componentDidMount =() => {
      this.getTableData();
    }

    getTableData = () => {
      const self = this;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        success: function(responseBody) {
          self.setState({
            tableData: responseBody.dataList,
            table: responseBody.table,
            loading: false
          }); 
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }
    
    afterQuery = (responseBody) => {
        this.setState({
          tableData: responseBody.dataList,
          loading: false
        });
    }

    queryData = (whereClause) => {
      const self = this;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          self.afterQuery(responseBody);
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    handleSearch = (whereClause) => {
      this.setState({loading: true});
      this.queryData(whereClause);
    }

    resetData = () => {
      
    }
    
    buildTable = () => {
        return  <EntityListTable rowKey={this.state.rowKey} selectedRowKeys={this.state.selectedRowKeys} selectedRows={this.state.selectedRows} table={this.state.table} data={this.state.tableData} loading={this.state.loading}/>
    }

    /**
     * 当页面不止是表格和queryForm的时候，可以继承该方法继续实现
     */
    buildOtherComponent = () => {

    }

    render() {
      let showQueryFormButton = this.state.showQueryFormButton;
      if (showQueryFormButton === undefined) {
          showQueryFormButton = true;
      }
      return (
        <div className="properties-page">
          <div className="router-body">
            <WrappedAdvancedQueryForm showButton={showQueryFormButton} searchTxt={this.state.searchTxt} handleReset={this.resetData.bind(this)} 
                                      wrappedComponentRef={(form) => this.form = form} 
                                      tableRrn={this.state.tableRrn} onSearch={this.handleSearch.bind(this)} />
            {showQueryFormButton ? <Divider/> : ""}                      
            {this.buildTable()}
            {this.buildOtherComponent()}
          </div>
          <BackTop visibilityHeight={300}/>
        </div>
      );
    }
}
