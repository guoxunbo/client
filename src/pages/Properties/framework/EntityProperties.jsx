import React, { Component } from 'react';

import EntityListTable from '@components/framework/table/EntityListTable';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import { BackTop, Divider } from 'antd';
import WrappedAdvancedQueryForm from '@components/framework/form/QueryForm';
import { DefaultRowKey } from '@api/const/ConstDefine';
import Table from "@api/dto/ui/Table";

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
        loading: false,
        selectedRowKeys:[],
        selectedRows:[],
        rowKey: DefaultRowKey,
        // 不是从菜单上指定properties此处会没值。
        parameters: this.props.match ? this.props.match.params : {}
      };
    }

    componentDidMount() {
      let self = this;
      let requestObject = {
          tableRrn: this.state.tableRrn,
          success: function(responseBody) {
              let table = responseBody.table;
              self.setState({
                  table: table,
                  formObject: Table.buildDefaultModel(table.fields, undefined)
              });
          }
      }
      TableManagerRequest.sendGetByRrnRequest(requestObject);
      this.loadDataInComponentDidMount();
    }

    loadDataInComponentDidMount = () => {

    }

    afterQuery = (responseBody, whereClause) => {
        this.setState({
          tableData: responseBody.dataList,
          loading: false,
          whereClause: whereClause
        });
    }

    queryData = (whereClause) => {
      const self = this;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          self.afterQuery(responseBody, whereClause);
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

    getDefaultTableProps = () => {
      return {
        rowKey: this.state.rowKey,
        selectedRowKeys: this.state.selectedRowKeys,
        selectedRows: this.state.selectedRows,
        data: this.state.tableData,
        tableRrn: this.state.tableRrn,
        loading: this.state.loading,
        scanAddFlag: this.state.scanAddFlag, 
        whereClause: this.state.whereClause
      }
    }

    buildTable = () => {
      return  <EntityListTable {...this.getDefaultTableProps()}/>
    }

    /**
     * 当页面不止是表格和queryForm的时候，可以继承该方法继续实现
     */
    buildOtherComponent = () => {

    }

    /**
     * buildDialog
     * 创建默认的dialog
     * 默认是空。EntityViewProperties用来弹框使用
     */
    buildDialog = () => {

    }

    render() {
      let showQueryFormButton = this.state.showQueryFormButton;
      if (showQueryFormButton === undefined) {
          showQueryFormButton = true;
      }
      return (
        <div className="properties-page">
          <div className="router-body">
            <WrappedAdvancedQueryForm showButton={showQueryFormButton}  
                                      searchTxt={this.state.searchTxt} 
                                      handleReset={this.resetData.bind(this)} 
                                      wrappedComponentRef={(form) => this.form = form} 
                                      tableRrn={this.state.tableRrn} 
                                      table={this.state.table}
                                      onSearch={this.handleSearch.bind(this)}
                                       />
            {showQueryFormButton ? <Divider/> : ""}                      
            {this.buildTable()}
            {this.buildOtherComponent()}
            {this.buildDialog()}
          </div>
          <BackTop visibilityHeight={100}/>
        </div>
      );
    }
}
