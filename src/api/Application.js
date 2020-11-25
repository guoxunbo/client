const Application = {
    name: 'WMS',
    version: "1.0.4",
    copyright: {
        name: "© 2018-至今By Newbiest",
        url: "https://github.com/guoxunbo/newbiest/"
    },
    database: "oracle",
    dispatchForm: {
        modalWidth: 800,
        width: 350,
        height: 400
    },
    table: {
        oprationColumn: {
            width: 100
        },
        checkBox: {
            width: 10
        },
        // 默认的分页配置
        pagination: {
            // 默认页数
            pageSize: 10,
            // 是否允许快速跳转到第几页
            showQuickJumper: true,
            // 是否可以改变 pageSize
            showSizeChanger: true,
            // 当只有1页的时候是否隐藏分页器
            hideOnSinglePage: true
        },
    },
    notice: {
        duration: 10,
        // 构建button组件是否支持关闭 支持点击锁定
        button: {
            closer: true,
            sticker: true,
            labels: {
                close: 'Close', stick: 'Stick', unstick: 'Unstick'
            }
        },
        mobile: {
            swipeDismiss: true,
            styling: true
        }
    },
    jsBarCode: {
        // 是否在条形码下方显示文字
        displayValue: true, 
        // 条形码 条之间的宽度
        width: 3.0,
        height: 100,
        margin: 0,
    },
};

const SC_STORAGE_NAME = "SessionContext";
const JWT_TOKEN_STORAGE_NAME = "JwtToken";

class SessionContext {
    language;
    username;
    orgName;
    description;
    orgRrn;
    token;
    authories;

    setLanguage(language) {
        this.language = language;
    }

    setUsername(username) {
        this.username = username;
    }

    setOrgName(orgName) {
        this.orgName = orgName;
    }

    setOrgRrn(orgRrn) {
        this.orgRrn = orgRrn;
    }

    setDescription(description) {
        this.description = description;
    }

    setAuthorities(authories) {
        this.authories = authories;
    }

    /**
     * 保存token
     */
    static saveToken(token) {
        sessionStorage.setItem(JWT_TOKEN_STORAGE_NAME, token)
    }

    static getToken() {
        return sessionStorage.getItem(JWT_TOKEN_STORAGE_NAME);
    }

    static saveSessionContext(username, description, orgRrn, language, authories) {
        let sc = new SessionContext();
        sc.setLanguage(language);
        sc.setUsername(username);
        sc.setDescription(description);
        sc.setOrgRrn(orgRrn);
        sc.setAuthorities(authories);
        sessionStorage.setItem(SC_STORAGE_NAME, JSON.stringify(sc));
    }

    static clear() {
        clearToken();
        clearSessionContext();
    }

    static clearToken() {
        sessionStorage.removeItem(JWT_TOKEN_STORAGE_NAME)
    }

    static clearSessionContext() {
        sessionStorage.removeItem(SC_STORAGE_NAME);
    }

    static getSessionContext() {
        let object = sessionStorage.getItem(SC_STORAGE_NAME);
        if (!object) {
            return undefined;
        } 
        return JSON.parse(object);
    }

    static getLanguage() {
        let sessionContext = this.getSessionContext();
        if (!sessionContext) {
            return undefined;
        }
        return sessionContext.language;
    }

    static getAuthorities() {
        let sessionContext = this.getSessionContext();
        if (!sessionContext) {
            return undefined;
        }
        return sessionContext.authories;
    }

    static getUsername() {
        let sessionContext = this.getSessionContext();
        if (!sessionContext) {
            return undefined;
        }
        return sessionContext.username;
    }
}

export {Application, SessionContext}
