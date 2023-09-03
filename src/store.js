import {createStore} from 'vuex'
import initSqlJs from "sql.js";
import path from "path-browserify";

const SQL = await initSqlJs({
    // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
    // You can omit locateFile completely when running in node
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
});
export const store = createStore({
    state: {db: null},
    mutations: {
        setDB(state, db) {
            state.db = db;
        },
    },
    actions: {
        async initializeDB({commit}) {
            try {
                await fetch(path.join('./wm.db'))
                    .then(response => response.arrayBuffer())
                    .then(buffer => {
                        let rawDataDBFile = new Uint8Array(buffer);
                        let dataDBFile = [];
                        for (let i = 0; i < rawDataDBFile.length; ++i) {
                            dataDBFile[i] = String.fromCharCode(rawDataDBFile[i])
                        }
                        commit('setDB', new SQL.Database(dataDBFile.join('')));
                    });
            } catch (error) {
                console.error('Error initializing database:', error);
            }
        },
    },
    getters: {
        getDB: (state) => state.db,
    },
})