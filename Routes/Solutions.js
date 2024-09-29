const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const { exec } = require('child_process');
const os = require('os')
const router = require('express').Router();
const {PortCheckDeploymentModel} = require('../Models/Schema')


app.use(express.json())

// const {UserModel} = require('../Models/User')
// const {DeploymentModel} = require('../Models/User')





//------------------> objects

router.post('/objects/dep', async (req, res) => {
  const path = "/home/avancer/Instream_backend/Final/Terraform/objects"
  const command = "python3 add_ADuser.py"
  const data = req.body
  try {
      console.log('Starting process to deploy objects...');
      
      exec(`cd ${path} && ${command}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error changing path or executing command: ${error.message}`);
          return;
        }
          console.log(`Successful output for deployment \n${stdout}`);
      });

      
      router.get('/objects/dep', (req, res) => {
        try {
            console.log("GET /objects/dep hit:", data);
            return res.status(200).json( data );
        } catch (error) {
            console.log(`Error ${error}`);
            return res.status(500).json({ error: `Internal error: ${error}` });
        }
      });

    return  res.status(200).json({ message: 'Process started' , data : data});
  } catch (error) {
      console.error('Error starting process', error.message);
      res.status(500).json({ error: 'Internal server error' });
  }
});


//------------------------->port_check

router.post('/port_check/dep', async (req, res) => {
  const path = "/home/avancer/Instream_backend/Final/Terraform/port_check"
  const command = "python3 runports_v1.py"
  const data = req.body
  try {
      console.log('Starting process to deploy port_check...');
      
      exec(`cd ${path} && ${command}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error changing path or executing command: ${error.message}`);
          return;
        }
          console.log(`Successful output for deployment \n${stdout}`);
      });

      
      router.get('/port_check/dep', (req, res) => {
        try {
            console.log("GET /port_check/dep hit:", data);
            return res.status(200).json( data );
        } catch (error) {
            console.log(`Error ${error}`);
            return res.status(500).json({ error: `Internal error: ${error}` });
        }
      });

      const portdata = new PortCheckDeploymentModel(data);
        await portdata.save();

    return  res.status(200).json({ message: 'Process started' , data : data});
  } catch (error) {
      console.error('Error starting process', error.message);
      res.status(500).json({ error: 'Internal server error' });
  }
});


//------------------> files aduser
router.post('/aduser/dep', async (req, res) => {
  const path = "/home/avancer/Instream_backend/Final/Terraform/files"
  const command = "python3 add_ADuser.py"
  const data = req.body
  try {
      console.log('Starting process to deploy aduser...');

      exec(`cd ${path} && ${command}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error changing path or executing command: ${error.message}`);
          return;
        }
          console.log(`Successful output for deployment \n${stdout}`);
      });

      
      router.get('/aduser/dep', (req, res) => {
        try {
            console.log("GET /aduser/dep hit:", data);
            return res.status(200).json( data );
        } catch (error) {
            console.log(`Error ${error}`);
            return res.status(500).json({ error: `Internal error: ${error}` });
        }
      });

    return  res.status(200).json({ message: 'Process started' , data : data});
  } catch (error) {
      console.error('Error starting process', error.message);
      res.status(500).json({ error: 'Internal server error' });
  }
});

//-----------------> files creating bucket

router.post('/create_bucket/dep', async (req, res) => {
  const path = "/home/avancer/Instream_backend/Final/Terraform/files"
  const command = "python3 create_bucket.py"
  const data = req.body
  try {
      console.log('Starting process to deploy create_bucket...');
      
      exec(`cd ${path} && ${command}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error changing path or executing command: ${error.message}`);
          return;
        }
          console.log(`Successful output for deployment \n${stdout}`);
      });

      
      router.get('/create_bucket/dep', (req, res) => {
        try {
            console.log("GET /create_bucket/dep hit:", data);
            return res.status(200).json( data );
        } catch (error) {
            console.log(`Error ${error}`);
            return res.status(500).json({ error: `Internal error: ${error}` });
        }
      });

    return  res.status(200).json({ message: 'Process started' , data : data});
  } catch (error) {
      console.error('Error starting process', error.message);
      res.status(500).json({ error: 'Internal server error' });
  }
});


//--------------------> webserver

router.post('/webserver/dep', async (req, res) => {
  const path = "/home/avancer/Instream_backend/Final/Terraform/webserver"
  const command = "python3 add_webserver.py"
  const data = req.body
  try {
      console.log('Starting process to deploy webserver...');
      
      exec(`cd ${path} && ${command}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error changing path or executing command: ${error.message}`);
          return;
        }
          console.log(`Successful output for deployment \n${stdout}`);
      });

      
      router.get('/webserver/dep', (req, res) => {
        try {
            console.log("GET /webserver/dep hit:", data);
            return res.status(200).json( data );
        } catch (error) {
            console.log(`Error ${error}`);
            return res.status(500).json({ error: `Internal error: ${error}` });
        }
      });

    return  res.status(200).json({ message: 'Process started' , data : data});
  } catch (error) {
      console.error('Error starting process', error.message);
      res.status(500).json({ error: 'Internal server error' });
  }
});


//-----------------> ndb


router.post('/ndb/dep', async (req, res) => {
  const path = "/home/avancer/Instream_backend/Final/Terraform/ndb"
  const command = "python3 add_ndb.py"
  const data = req.body
  try {
      console.log('Starting process to deploy ndb...');
      
      exec(`cd ${path} && ${command}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error changing path or executing command: ${error.message}`);
          return;
        }
          console.log(`Successful output for deployment \n${stdout}`);
      });

      
      router.get('/ndb/dep', (req, res) => {
        try {
            console.log("GET /ndb/dep hit:", data);
            return res.status(200).json( data );
        } catch (error) {
            console.log(`Error ${error}`);
            return res.status(500).json({ error: `Internal error: ${error}` });
        }
      });

    return  res.status(200).json({ message: 'Process started' , data : data});
  } catch (error) {
      console.error('Error starting process', error.message);
      res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
