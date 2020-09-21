const viewer = {
    state: {
        viewer: Object,  
        dynamic: false,
        draw_type: 'polyline',
        draw_style: Object,
    },

    mutations: {
        SET_VIEWER:(state, code) => {
            state.viewer = code;
        },
        SET_DYNAMIC:(state, code) => {
            state.dynamic = code;
        },
        SET_DRAW_TYPE:(state, code) => {
            state.draw_type = code;
        },
        SET_DRAW_STYLE:(state, code) => {
            state.draw_style = code;
        }
    },
}

export default viewer;