const leftSide = {
    state: {
        title: "默认",
        subTitle: "默认",
        drawer: false,
        type: String,
        innerDrawer: false,
    },

    mutations: {
        SET_LEFT_TITLE: (state, code) => {
            state.title = code;
        },
        SET_LEFT_SUB_TITLE: (state, code) => {
            state.subTitle = code;
        },
        SET_LEFT_DRAWER: (state, code) => {
            state.drawer = code;
        },
        SET_LEFT_TYPE: (state, code) => {
            state.type = code;
        },
        SET_LEFT_INNERDRAWER: (state, code) => {
            state.innerDrawer = code;
        },
    },
}

export default leftSide;