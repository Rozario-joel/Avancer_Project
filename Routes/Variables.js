const express = require('express');
const app = express()
const router = require('express').Router();
const {DeploymentModel} = require('../Models/Schema')

app.use(express.json())

router.post('/var/ndb',async (req,res)=>{
    try {
        const data = req.body; //terraform data
         await DeploymentModel.save(data);
        router.get('/var/ndb', (req, res) => {
            try {
                console.log('GET /var/ndb hit: ',data);
                return res.status(200).json(data );
            } catch (error) {
                console.log(`Error ${error}`);
                return res.status(500).json({ error: `Internal error: ${error}` });
            }
        });
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: `Internal error: ${error}` });
    }
})

router.post('/var/ports',(req,res)=>{
    try {
        const data = req.body; 
        router.get('/var/ports', (req, res) => {
            try {
                console.log("GET /var/ports hit:", data);
                return res.status(200).json( data );
            } catch (error) {
                console.log(`Error ${error}`);
                return res.status(500).json({ error: `Internal error: ${error}` });
            }
        });
        console.log("post /var/ports hit:",data);
        return res.status(200).json( data );
    } catch (error) {
        return res.status(500).json({ error: `Internal error: ${error}` });
    }
})

router.post('/var/files',(req,res)=>{
    try {
        const data = req.body; 
        router.get('/var/files', (req, res) => {
            try {
                console.log("GET /var/files hit:", data);
                return res.status(200).json( data );
            } catch (error) {
                console.log(`Error ${error}`);
                return res.status(500).json({ error: `Internal error: ${error}` });
            }
        });
        console.log("post /var/files hit:",data);
        return res.status(200).json( data );
    } catch (error) {
        return res.status(500).json({ error: `Internal error: ${error}` });
    }
})

router.post('/var/webserver',(req,res)=>{
    try {
        const data = req.body; 
        router.get('/var/webserver', (req, res) => {
            try {
                console.log("GET /var/webserver hit:", data);
                return res.status(200).json( data );
            } catch (error) {
                console.log(`Error ${error}`);
                return res.status(500).json({ error: `Internal error: ${error}` });
            }
        });
        console.log("post /var/webserver hit:",data);
        return res.status(200).json( data );
    } catch (error) {
        return res.status(500).json({ error: `Internal error: ${error}` });
    }
})




module.exports = router;
