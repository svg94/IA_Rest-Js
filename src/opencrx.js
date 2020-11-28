const axios = require('axios');
const qs = require('querystring');
const express=require('express');
const app=express();

async function getAllCustomers(){
    const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';
    const credentials = {
        username: 'guest',
        password: 'guest',
    };
    const config = {
        headers: {'Accept': 'application/json'},
        auth: credentials,
    };
    const contacts = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config);
    const customers = contacts.data.objects;
    return customers;
}

async function getAllProducts(){
    const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';
    const credentials = {
        username: 'guest',
        password: 'guest',
    };
    const config = {
        headers: {'Accept': 'application/json'},
        auth: credentials,
    };
    const contacts = await axios.get(`${baseUrl}/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product`, config);
    const products = contacts.data.objects;
    return products;
}
async function postNewProduct(){
    const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';
    const credentials = {
        username: 'guest',
        password: 'guest',
    };
    const config = {
        headers: {'Accept': 'application/json'},
        auth: credentials,
    };
    const body ={

        "@type": "org.opencrx.kernel.product1.Product",
        "@href": "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/12",
        "@version": "bW9kaWZpZWRBdD0yMDIwLTExLTI4VDIyOjQ3OjQ3LjEzOTAwMFo=",
        "modifiedAt": "2020-11-28T22:47:47.139Z",
        "createdAt": "2019-05-26T12:08:42.436Z",
        "owningGroup": {
        "_item": [
            {
                "@index": "0",
                "@href": "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/Users",
                "$": "xri://@openmdx*org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/Users"
            },
            {
                "@index": "1",
                "@href": "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/Administrators",
                "$": "xri://@openmdx*org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/Administrators"
            }
        ]
    },
        "productState": 1,
        "itemNumber": 0,
        "productNumber": 1009,
        "disabled": false,
        "identity": "xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/9JMBMVTX2CSMHH2MA4T2TYJFL",
        "owningUser": {
        "@href": "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User",
            "$": "xri://@openmdx*org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User"
    },
        "minMaxQuantityHandling": 0,
        "modifiedBy": {
        "_item": [
            {
                "@index": "0",
                "$": "guest"
            }
        ]
    },
        "accessLevelUpdate": 2,
        "isStockItem": false,
        "maxPositions": 20,
        "owner": {
        "_item": [
            {
                "@index": "0",
                "$": "Standard:guest.User"
            },
            {
                "@index": "1",
                "$": "Standard:Users"
            },
            {
                "@index": "2",
                "$": "Standard:Administrators"
            }
        ]
    },
        "allowModification": false,
        "allowRemoval": false,
        "createdBy": {
        "_item": [
            {
                "@index": "0",
                "$": "guest"
            }
        ]
    },
        "minPositions": 1,
        "maxQuantity": "20.000000000",
        "description": "Name ist Programm.",
        "minQuantity": "1.000000000",
        "name": "BetterThanDyson",
        "accessLevelDelete": 2,
        "accessLevelBrowse": 3

    };
    const contactsPost = await axios.post(`${baseUrl}/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/12`,body ,config);
}
app.get('/customers',(req,res)=>{
    getAllCustomers().then(function(respond){
        res.send(respond);
    });
});
app.get('/products',(req,res)=>{
    getAllProducts().then(function(respond){
        res.send(respond);
    });
});

app.get('/addProduct',(req,res)=>{
   postNewProduct().then(function(respond){
     res.send(respond);
   });
});

app.listen(8081,()=>{
    console.log('Läuft diggi');
});
//getAllCustomers().then(function(respond){console.log(respond)});