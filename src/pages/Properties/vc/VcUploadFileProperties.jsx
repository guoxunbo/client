import VcUploadFileTable from "@components/vc/table/VcUploadFileTable";
import EntityProperties from "@properties/framework/EntityProperties";

/**
 * 文件上传
 */
export default class VcUploadFileProperties extends EntityProperties{

    static displayName =  'VcUploadFileProperties';

    constructor (props){
        super(props);
        this.state = {...this.state};
    }

    buildTable =()=>{
        return <VcUploadFileTable
                        {...this.getDefaultTableProps()}/>
    }

    

}
