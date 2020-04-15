import * as PropTypes from 'prop-types';

export default class Tree{

    objectRrn;
    name;
    category;

    constructor() {
    }

    setObjectRrn(objectRrn) {
        this.objectRrn = objectRrn;
    }

    setName(name) {
        this.name = name;
    }
    
    setCategory(category) {
        this.category = category;
    }
}

Tree.prototypes = {
    objectRrn: PropTypes.number.isRequired,
    fields: PropTypes.array,
    whereClause: PropTypes.string
}