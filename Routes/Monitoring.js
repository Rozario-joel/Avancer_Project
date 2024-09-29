const express = require('express');
const app = express()
const router = require('express').Router();
const path = "/home/joel/Joel/Demo/Terraform/CreateVm"

app.use(express.json())

router.post('/ndb',(req,res)=>{
    try {
        console.log("post /ndb api working");
        
        const data = req.body; // Get data from Terraform
        console.log(`POST API /monitorndb hit: ${data}`);

        router.get('/ndb', (req, res) => {
            try {
                console.log(`GET API /monitorndb hit: ${data}`);
                return res.status(200).json({ data });
            } catch (error) {
                console.log(`Error ${error}`);
                
            }
        });

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error: `Internal error: ${error}` });
    }
})

router.post('/object',(req,res)=>{
    try {
        console.log("post /ndb api working");
        
        const data = req.body; // Get data from Terraform
        console.log(`POST API /monitorndb hit: ${data}`);

        router.get('/object', (req, res) => {
            console.log(`GET API /monitorndb hit: ${data}`);
            return res.status(200).json({ data });
        });

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error: `Internal error: ${error}` });
    }
})

// router.post('/files',(res,req)=>{

// })

// router.post('/object',(res,req)=>{

// })


module.exports = router;
