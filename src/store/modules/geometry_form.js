const geometryForm = {
    state: {
        lat: '39.0000',
        lon: '116.0000',
        selectPostion: false,
    },

    mutations: {
        SET_LAT: (state, code) => {
            state.lat = code;
        },
        SET_LON: (state, code) => {
            state.lon = code;
        },
        SET_SELECT_POSITION: (state, code) => {
            state.selectPostion = code
        }
    },
}

export default geometryForm;