import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:7000';

export default{
    async execute(method, resource, body){
        let returnValue;
        try{
            returnValue = await axios({
                method: method,
                headers:{
                    'Content-Type': 'application/json'
                },
                url: resource,
                data: body,
                withCredentials: true
            });

            if(returnValue.status === 401){
                returnValue = undefined;
                await axios({
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    url: '/auth/refresh/token',
                    data: {},
                    withCredentials: true
                });
            }

        }
        catch(error){
            if(error.response.status === 401){
                returnValue = undefined;
                await axios({
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    url: '/auth/refresh/token',
                    data: {},
                    withCredentials: true
                });
            }
            else{
                throw error;
            }
        }

        if(!returnValue){
            console.log("çalıştı");
            returnValue = await axios({
                method: method,
                headers:{
                    'Content-Type': 'application/json'
                },
                url: resource,
                data: body,
                withCredentials: true
            });
        }

        return returnValue;
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
    },
    async logout(){
        return this.execute('post', '/auth/logout', {});
    },
    async register(data){
        return this.execute('post', '/auth/register', data);
    },
    async updateUserData(username, data){
        return this.execute('put', '/user/' + username, data);
    }

}