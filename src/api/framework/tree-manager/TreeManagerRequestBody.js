import Tree from "@api/dto/ui/Tree";

const ActionType = {
    GetByCategory: "GetByCategory",
    GetTreeData: "GetTreeData"
}

export default class TreeManagerRequestBody {
    actionType;
    treeNode;
    parentObject;

    constructor(actionType, treeNode, parentObject) {
        this.actionType = actionType;
        this.treeNode = treeNode;
        this.parentObject = parentObject;
    }
    
    static buildGetByCategory = (category) => {
        let treeNode = new Tree();
        treeNode.setCategory(category);
        return new TreeManagerRequestBody(ActionType.GetByCategory, treeNode);
    }
    
    static buildGetTreeData = (treeNode, parentObject) => {
        return new TreeManagerRequestBody(ActionType.GetTreeData, treeNode, JSON.stringify(parentObject));
    }

}