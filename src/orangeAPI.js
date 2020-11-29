const axios = require('axios');
const qs = require('querystring');
const express=require('express');
const app=express();

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
/*
 *  CONTROLLER FUNCTIONS
 *
 */
async function getEmployeeList(token){
    const config = {
      headers: {
          'Authorization': `Bearer ${token}`,
      }
    };
    const res = await axios.get(`${baseUrl}/api/v1/employee/search`,config);    //Frage für Vorlesung: Warum brauche ich `` statt '' oder ""?
    return res;
}
async function getEmployee(token, id){
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };
    const res = await axios.get(`${baseUrl}/api/v1/employee/${id}`,config);
    return res;
}
async function putEmployeeSalary(token, id){
    const body = {             //TODO: gib im body den salary an, evtl noch stringify benutzen
        salary : "45678",
    };
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };
    const res = await axios.put(`${baseUrl}${id}`,config);      //TODO: Write Right URL
    return res;
}

/*
 *      EXPRESS FUNCTIONS
 *
 */

app.get('/token',(req,res)=>{                   //Create the token
    getToken().then(function(resolved){
        res.send("token received: "+accessToken);
    });
});
app.get('/currToken',(req,res)=>{               //check current Token
    res.send("Current token: "+accessToken);
});

app.get('/getEmployeeList',(req,res)=>{         //Get the List of employees.
    getEmployeeList(accessToken).then(
        (respond)=>{
            res.send(respond.data);
        }).catch(
        (err)=>{
            res.send(err);
        }
    )
});
app.get('/getEmployee/:id',(req,res)=>{         //Get specific employee .
    getEmployee(accessToken, req.params.id).then(
        (respond)=>{
            res.send(respond.data);
        }).catch(
        (err)=>{
            res.send(err);
        }
    )
});
/*app.post('/',(req,res)=>{
    res.send("Hello World!");
});*/
app.get('/putEmployeeSalary/:id',(req,res)=>{           //change the salary of an employee
    putEmployeeSalary(accessToken,req.params.id).then(
        (respond)=>{
            res.send(respond.data);
        }).catch(
        (err)=>{
            res.send(err);
        }
    )
});
app.listen(8081,()=>{
    console.log('Läuft diggi');
});


