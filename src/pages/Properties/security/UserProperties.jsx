import EntityProperties from "@properties/framework/EntityProperties";
import UserTable from "@components/security/table/UserTable";

export default class UserProperties extends EntityProperties{

    static displayName = 'UserProperties';
    
    buildTable = () => {
        return <UserTable {...this.getDefaultTableProps()} />
    }

}