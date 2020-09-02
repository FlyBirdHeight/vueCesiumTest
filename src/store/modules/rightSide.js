const RightSide = {
    state: {
        title: "默认",
        subTitle: "默认",
        drawer: false,
    },

    mutations: {
        SET_RIGHT_TITLE: (state, code) => {
            state.title = code;
        },
        SET_RIGHT_SUB_TITLE: (state, code) => {
            state.subTitle = code;
        },
        SET_RIGHT_DRAWER: (state, code) => {
            state.drawer = code;
        },
    },
}

export default RightSide;