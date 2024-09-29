const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

const FilesDeploymentData = new Schema({
});



const WebserverDeploymentData = new Schema({
    cluster_name : {
        type : String
      },
      subnet_name : {
        type : String
      },
      password : {
        type      : String
      },
      endpoint : {
        type : String
      },
      user : {
        type : String
      }
});


const PortCheckDeploymentData = new Schema({
        Source_user_name  : String,
        FDSource_password : String,
        solution : String,
        portVM : String,
        CVM_src_ip : String,
        FSVMS_dst_ip : String
});

const PortCheckDeploymentModel = mongoose.model('PortCheck' , PortCheckDeploymentData)

const WebserverDeploymentModel = mongoose.model('WebServer' , WebserverDeploymentData)

const FilesDeploymentModel = mongoose.model('Files' , FilesDeploymentData)

const UserModel = mongoose.model('users', UserSchema);

module.exports = {UserModel , FilesDeploymentModel , WebserverDeploymentModel,PortCheckDeploymentModel}