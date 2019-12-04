import Table from "@api/dto/ui/Table"

const ActionType = {
    LoadTree: "LoadTree",
    GetNextTreeNode: "GetNextTreeNode"
}

export default class TreeManagerRequestBody {

    actionType;
    group;
    treeNode;

    constructor(actionType, group, treeNode){
        this.actionType = actionType;
        this.group = group;
        this.treeNode = treeNode;
    }

    static buildLoadTree(group) {
        return new TreeManagerRequestBody(ActionType.LoadTree, group);
    }

    static buildLoadNextNode(currentNode, object) {
        let treeNode = {
            node: currentNode,
            parentObject: object
        };
        return new TreeManagerRequestBody(ActionType.GetNextTreeNode, undefined, treeNode);
    }
}
