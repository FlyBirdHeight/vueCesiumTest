const leftSide = {
    state: {
        title: "默认",
        subTitle: "默认",
        drawer: false,
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
    },
}

export default leftSide;