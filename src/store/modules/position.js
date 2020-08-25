const position = {
    state: {
        position: String,  
    },

    mutations: {
        SET_POSITION:(state, code) => {
            state.position = code;
        }
    },
}

export default position;