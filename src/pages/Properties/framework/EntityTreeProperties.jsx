import EntityProperties from "@properties/framework/EntityProperties";
import EntityListTable from "@components/framework/table/EntityListTable";
import TreeManagerRequest from "@api/framework/tree-manager/TreeManagerRequest";

/**
 * 具备树形表格的页面
 * TreeName从paramter1上获取
 */
export default class EntityTreeProperties extends EntityProperties{

    static displayName = 'EntityTreeProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, treeCategory : this.props.match.params.parameter1, treeList: undefined};
    }

    componentDidMount = () => {
        this.initTree();
    }

    getTableTreeProps = () => {
        return {...this.getDefaultTableProps(), treeList: this.state.treeList, rootTreeNode: this.state.rootTreeNode} 
    }

    initTree = () => {
        let self = this;
        const {treeCategory} = this.state;
        let request = {
            category: treeCategory,
            success: function(response) {
                let {treeList} = response;
                let rootTreeNodes = treeList.filter((tree) => tree.parentRrn == undefined);
                self.setState({
                    treeList: treeList,
                    rootTreeNode: rootTreeNodes[0]
                });
            }
        }
        TreeManagerRequest.sendGetByCategoryRequest(request);
    }

    buildTable = () => {
        return <EntityListTable {...this.getTableTreeProps()}  />
    }

}