const mongoose=require('mongoose');
const connectdb =async () => {
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
        })
        console.log(`mongodb connected: ${conn.connection.host}`)

    }
    catch(err){
        console.error(err)
        process.exit(1)
        console.log('not working error')
    }
}

module.exports=connectdb
