const viewer = {
    state: {
        viewer: Object,  
    },

    mutations: {
        SET_VIEWER:(state, code) => {
            state.viewer = code;
        }
    },
}

export default viewer;