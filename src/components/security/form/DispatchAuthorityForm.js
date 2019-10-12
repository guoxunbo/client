import {Component} from "react";
import { Tree } from "antd";
import IconUtils from "@api/utils/IconUtils";

const { TreeNode } = Tree;

export default class DispatchAuthorityForm extends Component {

    static displayName = 'DispatchAuthorityForm';

    constructor(props) {
      super(props);
      const{authorities, checkedKeys, roleAuthorities} = this.props;

      this.state = {
        authorities: authorities,
        checkedKeys: checkedKeys,
        roleAuthorities: roleAuthorities,
      }
    }

    /**
     * 因为存在halfCheck。即选中子节点表示选中父节点。
     * antd默认的checkedKeys不会有半选中状态。需要自己获取并传递
     */
    onCheck = (checkedKeys, info) => {
      let roleAuthorities = [...checkedKeys, ...info.halfCheckedKeys]
      this.setState({ checkedKeys, roleAuthorities});
    }

    renderTreeNodes = (authorities) => {
      if (authorities) {
        let treeNodes = [];
        authorities.map((authority) => {
          treeNodes.push(<TreeNode icon={IconUtils.buildIcon(authority.image)} title={authority.labelZh} key={authority.objectRrn} dataRef={authority}>
                             {this.renderTreeNodes(authority.subAuthorities)}
                           </TreeNode>);
        });
        return treeNodes;
      }
    }

    buildForm = () => {
        return (
            <Tree
              showIcon
              checkable
              onCheck={this.onCheck}
              checkedKeys={this.state.checkedKeys}
            >
            {this.renderTreeNodes(this.props.authorities)}
            </Tree>
        );
    }

    render() {
        return (
            <div>
               {this.buildForm()}
            </div>
        );
    }

}