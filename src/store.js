import {createStore} from 'vuex'
import initSqlJs from "sql.js";
import axios from "axios";
import * as path from "path";

const base64 = require('base-64');
const apiUrl = `https://api.github.com/repos/iamhimansu/personalDB/contents/wm.db`;
// const apiDownloadUrl = `https://api.github.com/repos/iamhimansu/personalDB/contents/wm.db`;

const token = "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"
const headers = {
    'Authorization': `token ${token}`,
    'Content-Type': 'application/json',
};

const SQL = await initSqlJs({
    // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
    // You can omit locateFile completely when running in node
    // locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
    locateFile: file => path.join(file)
});
export const store = createStore({

    state: {
        db: null,
        isDBLoaded: false,
        processingList: [],
        isDevelopment: false,
    },
    mutations: {
        SET_DATA(state, key, newData) {
            state[key] = newData;
        },
        GET_DATA(state, key) {
            return state[key];
        },
        setDB(state, db) {
            state.db = db;
            state.isDBLoaded = true;
        },
        setDBLoadMessage(state, message) {
            state.processingList.push({message: message});
        },
        emptyProcessingList(state) {
            state.processingList = [];
        }
    },

    actions: {
        async initializeDB({commit, state}) {
            if (state.isDevelopment) {
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
            } else {
                commit('setDBLoadMessage', 'Initiating Download Request');
                const myHeaders = new Headers();
                myHeaders.append("Authorization", "token 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");
                myHeaders.append("Accept", "application/vnd.github.v3.raw");

                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
                try {
                    commit('setDBLoadMessage', 'Download started');

                    await fetch(apiUrl, requestOptions)
                        .then(response => response.arrayBuffer())
                        .then(buffer => {
                            commit('setDBLoadMessage', 'DB Downloaded');
                            let rawDataDBFile = new Uint8Array(buffer);
                            let dataDBFile = [];
                            commit('setDBLoadMessage', 'Parsing Binary');

                            for (let i = 0; i < rawDataDBFile.length; ++i) {
                                dataDBFile[i] = String.fromCharCode(rawDataDBFile[i])
                            }
                            commit('setDBLoadMessage', 'Parsed Binary');
                            commit('setDBLoadMessage', 'Setting DB');
                            commit('setDBLoadMessage', 'Establishing Connection');

                            commit('setDB', new SQL.Database(dataDBFile.join('')));
                            commit('setDBLoadMessage', 'Connected');
                            commit('emptyProcessingList');
                        });
                } catch (error) {
                    console.error('Error initializing database:', error);
                }
            }
        },
        downloadDb({commit}, db) {
            const blob = new Blob([db.export()], {type: "application/octet-stream"});
            const a = document.createElement("a");
            a.href = window.URL.createObjectURL(blob);
            a.download = new Date().getTime() + "_db.db"; // Specify the filename
            a.download = "wm.db"; // Specify the filename
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            console.log(commit)
            console.clear()
        },
        uploadDBFileToGithub(context) {
            context.state.isDBLoaded = false;
            context.state.processingList = [];
            // console.log('1. Request initiated');
            context.state.processingList.push({
                message: 'Request initiated'
            });
            context.state.processingList.push({
                message: 'Fetching SHA key'
            });            //Fetch db sha
            axios.get(apiUrl, {headers})
                .then((response) => {
                    console.log(response)
                    try {
                        if (response.data) {
                            // console.log('2. Fetching SHA key')
                            if (response.data.sha && typeof response.data.sha !== 'undefined') {
                                // console.log('3. Fetched SHA');
                                context.state.processingList.push(
                                    {message: 'Fetched SHA key'},
                                    {message: 'Started converting Blob to Binary'}
                                );
                                // console.log('4. Started converting Blob to Binary')
                                const binaryString = context.getters.getDB.export().reduce((data, byte) => data + String.fromCharCode(byte), '');
                                context.state.processingList.push(
                                    {message: 'Finished converting Blob to Binary'},
                                    {message: 'Converting binary to base64'}
                                );
                                /*console.log('5. Finished converting Blob to Binary')
                                console.log('6. Converting binary to base64')*/
                                const base64String = base64.encode(binaryString);
                                // console.log('7. Converted binary to base64');
                                context.state.processingList.push({
                                    message: 'Converted binary to base64'
                                });
                                // const binaryBase64 = base64.encode(blob);
                                const data = JSON.stringify({
                                    "message": "db update",
                                    "content": base64String,
                                    "sha": response.data.sha
                                });

                                const config = {
                                    method: 'put',
                                    url: apiUrl,
                                    headers: headers,
                                    data: data
                                };
                                context.state.processingList.push({
                                    message: 'Uploading to github'
                                });
                                // console.log('8. Uploading to github')

                                return axios(config)
                                    .then(function () {
                                        context.state.processingList.push(
                                            {message: 'Uploaded to github'},
                                            {message: 'Refreshing content'}
                                        );
                                        /*console.log('9. Uploaded to github');
                                        console.log('10. Refreshing content');*/
                                        context.state.isDBLoaded = true;
                                        console.log(context.state.processingList);
                                        context.state.processingList = [];


                                    })
                                    .catch(function () {
                                        console.log('9. Failed to upload to github');
                                        context.state.processingList.push(
                                            {message: 'Failed to upload to github'},
                                        );
                                        context.state.isDBLoaded = true;
                                        context.state.processingList = [];
                                    });
                            } else {
                                console.log('- DB File does not exists');
                            }
                        }
                    } catch (e) {
                        console.log(e)
                    }
                })

        }

    },
    getters: {
        getDB: (state) => state.db,
    },
})