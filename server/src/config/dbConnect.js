const mongoose = require ('mongoose');



const dbConnet = async() => {
  try{ await mongoose.connect( 
    process.env.MONGO_URL,{
    //useUnifiedTopology: true,
    //useNewUrlParser: true,
  }
);

  console.log("DB Connected Successfully");
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};
module.exports = dbConnet;