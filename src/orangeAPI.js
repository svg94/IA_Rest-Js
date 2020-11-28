const axios = require('axios');
const qs = require('querystring');
const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';
let accessToken = null;
async function getToken() {
    const body = qs.stringify({
        client_id: 'api_oauth_id',
        client_secret: 'oauth_secret',
        grant_type: 'password',
        username: 'demouser',
        password: '*Safb02da42Demo$'
    });
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        }
    };

    const res = await axios.post(`${baseUrl}/oauth/issueToken`, body, config);
    if (res.data.error) {
        throw Error(res.data.error);
    }


    accessToken = res.data['access_token'];
    console.log(accessToken);
}

async function getEmployeeList(token){
    const config = {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Token': ''+token,
      }
    };
    try{
        const res = await axios.get("${baseUrl/api/v1/employee/search'}",config);
    }catch (e) {
        console.log(e);
    }
}
getToken().then(
    function(){getEmployeeList().then(r => console.log(r));},
);


