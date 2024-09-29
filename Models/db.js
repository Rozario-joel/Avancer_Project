const mongoose = require('mongoose');

const mongo_url_login = process.env.MONGO_CONN_login;
const mongo_url_vmdata = process.env.MONGO_CONN_vmdata;

const logindb = mongoose.connect(mongo_url_login )
  .then(() => {
    console.log('Login db connected');
  })
  .catch((err) => {
    console.error('Login DB Connection Error:', err);
  });

// logindb.on('connected',()=>{
//     console.log("Login db Connected");
// })
// logindb.on('error',()=>{
//     console.error("Login db error" , error);
// })

const depDb = mongoose.createConnection(mongo_url_vmdata, )
  // .then(() => {
  //   console.log('Deployment db connected');
  // })
  // .catch((err) => {
  //   console.error('Deployment DB Connection Error:', err);
  // });


depDb.on('connected',()=>{
    console.log("Deployment db Connected");
})
depDb.on('error',()=>{
    console.error("Deployment db error" , error);
})