const mongoose = require('mongoose')


const connect = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        
        if(connection){
          console.log(` connected to ` + connection.connection.host + ` database`);
        }
        else{
           console.log("not connected")
        }
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
}

module.exports = connect