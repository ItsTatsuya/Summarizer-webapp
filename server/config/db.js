const mongoss=require('mongoose');
require('dotenv').config({ path: '../.env' });

mongoss.connect(process.env.DB_URL).then((err,res)=>{
  if(err){
    console.log(err);
  }
  console.info("connected");
  // mongoss.connection.close();
});