
const TimeStamp = (req, res, next) => { 
    const time = new Date().toISOString();
    const {name , email} = req.body 
  
    console.log(`${name} with email ${email} logged on ${time}`);
  
    next(); 
}

//put this info into db and get the logs out of it

module.exports = TimeStamp