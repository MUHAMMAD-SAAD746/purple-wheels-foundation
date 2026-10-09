require('dotenv').config()
const app = require("./src/app")
// const connectDb = require("./src/db/db")

const PORT = process.env.PORT || 3000;

// const startServer = async () => {
//     await connectDb();

//     app.listen(PORT, () => {
//         console.log("Server is running on Port:", PORT);
//     });
// };

// startServer();


// the code above can not use on serverless deployments like vercel
// thats why we listen port in condition if not on production

// connectDb();

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log("Server is running on Port:", PORT);
    });
}

module.exports = app;