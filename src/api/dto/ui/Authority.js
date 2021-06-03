import {Language} from "@const/ConstDefine"
import PropertyUtils from "@utils/PropertyUtils";

export default class Authority {

    name;
    path;
    icon;
    tableRrn;
    children;
    objectRrn;
    parentRrn;
    url;
    newWindow;

    parameter1;
    parameter2;
    parameter3;
    parameter4;
    parameter5;

    constructor(authority, language) {
        PropertyUtils.copyProperties(authority, this);
        this.icon = authority.image;
        this.path = this.buildPath();
        if (language == Language.Chinese) {
            this.name = authority.labelZh;
        } else if (language == Language.English) {
            this.name = authority.labelEn;
        } else {
            this.name = authority.labelRes;
        }
        //处理子菜单
        let subAuthorities = authority.subAuthorities;
        if (subAuthorities && subAuthorities.length > 0) {
            let subMenus = [];
            subAuthorities.map((authority, index) => {
                let subMenu = new Authority(authority, language);
                subMenus[index] = subMenu;
            });
            this.children = subMenus;
        } else {
            if (authority.authorityCategory == "FineReport") {
                this.path = "http://" + authority.url;
                this.newWindow = true;
            }
        }
    
    }

    /**
     * 创建路径。参数必须从1-5。不能从中间直接设置
     * 
     */
    buildPath = () => {

        let path = this.url + "/" + this.tableRrn + "/" + this.parentRrn;
        if (this.parameter1) {
            path += "/" + this.parameter1;
            if (this.parameter2) {
                path += "/" + this.parameter2;
                if (this.parameter3) {
                    path += "/" + this.parameter3;
                } 
                if (this.parameter4) {
                    path += "/" + this.parameter4;
                    if (this.parameter5) {
                        path += "/" + this.parameter5;
                    } 
                } 
            } 
        } 
        return path;
    }

    static buildMenu(authorityList, language) {
        if (Array.isArray(authorityList) && authorityList.length > 0) {
            let menus = [];
            authorityList.map((authority, index) => {
                let menu = new Authority(authority, language);
                menus[index] = menu;
            });
            return menus;
        }
        return null;
    }
}
