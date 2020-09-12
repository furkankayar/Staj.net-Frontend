import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:7000';

export default{
    async execute(method, resource, body){
        return axios({
            method: method,
            headers:{
                'Content-Type': 'application/json'
            },
            url: resource,
            data: body,
            withCredentials: true
        });
    },
    async login(data){
        return this.execute('post', '/auth/login', data);
    },
    async getUser(username){
        return this.execute('get', '/user/' + username, {});
    },
    async getUsers(){
        return this.execute('get', '/user', {});
    },
    async whoami(){
        return this.execute('get', '/auth/whoami', {});
    }

}