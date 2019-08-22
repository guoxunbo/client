import React, { Component } from 'react';
import '../../properties.scss'

import EntityListTable from '../../../../components/Table/EntityListTable';
import TableManagerRequest from '../../../../api/table-manager/TableManagerRequest';
import { BackTop, Divider } from 'antd';
import WrappedAdvancedQueryForm from '../../../../components/Form/QueryForm';
import { DefaultRowKey } from '../../../../api/const/ConstDefine';

export default class EntityProperties extends Component {
  
    static displayName = 'EntityProperties';

    constructor(props) {
      super(props);
      this.state = {
        tableRrn : this.props.match.params.tableRrn,
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
    
    queryData = (whereClause) => {
      const self = this;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          self.setState({
            tableData: responseBody.dataList,
            loading: false
          });
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    handleSearch = (whereClause) => {
      this.setState({loading: true});
      this.queryData(whereClause);
    }

    buildTable = () => {
        return  <EntityListTable rowKey={this.state.rowKey} selectedRowKeys={this.state.selectedRowKeys} selectedRows={this.state.selectedRows} table={this.state.table} data={this.state.tableData} loading={this.state.loading}/>
    }

    render() {
      return (
        <div className="properties-page">
          <div className="router-body">
            <WrappedAdvancedQueryForm wrappedComponentRef={(form) => this.form = form} tableRrn={this.state.tableRrn} onSearch={this.handleSearch.bind(this)} />
            <Divider/>
            {this.buildTable()}
          </div>
          <BackTop visibilityHeight={300}/>
        </div>
      );
    }
}
