require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routes/clientrouter");
const cors = require("cors");
const cookiParser = require("cookie-parser")
const port =  process.env.PORT || 8080;
const routers = require("./routes/companyroutes")
const routeruser = require("./routes/subuser")

const routerstation=require("./routes/emmisionroute");
const superouter = require("./routes/superadmin");
const path =require('path')





app.use(express.json());
app.use(cookiParser());
// app.use(cors());
app.use(router);
app.use(routers);
app.use(routeruser);
app.use(superouter)
app.use(routerstation);




app.use(cors(
    {
        origin:"*",
        methods:["GET","POST","DELETE","PUT"],
    }
))

app.listen(port);