const app = require("./app");

const dotenv = require('dotenv');
const connectDatabase = require("./config/database");

//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})
dotenv.config({ path: "./config/config.env" });
connectDatabase();


const PORT =  process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise rejection`);
    Server.close(()=>{
        process.exit(1);
    });
})