import React, { Component } from 'react';
import '../../properties.scss'

import EntityListTable from '../../../../components/Table/EntityListTable';
import TableManagerRequest from '../../../../api/table-manager/TableManagerRequest';
import { BackTop, Divider } from 'antd';
import WrappedAdvancedQueryForm from '../../../../components/Form/QueryForm';

export default class EntityProperties extends Component {
  
    static displayName = 'EntityProperties';

    constructor(props) {
      super(props);
      this.state = {
        tableRrn : this.props.match.params.tableRrn,
        tableData: undefined,
        table: {fields: []},
        loading: true
      };
    }

    componentDidMount =() => {
      this.getTableData();
    }

    getTableData = (whereClause) => {
      const self = this;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
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
    
    handleSearch = (whereClause) => {
      this.setState({loading: true});
      this.getTableData(whereClause);
    }

    buildTable = () => {
        return  <EntityListTable table={this.state.table} data={this.state.tableData} loading={this.state.loading}/>
    }

    render() {
      return (
        <div className="properties-page">
          <div className="router-body">
            <WrappedAdvancedQueryForm tableRrn={this.state.tableRrn} onSearch={this.handleSearch.bind(this)} />
            <Divider/>
            {this.buildTable()}
          </div>
          <BackTop visibilityHeight={300}/>
        </div>
      );
    }
}
