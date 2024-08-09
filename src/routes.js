const { authRoutes } = require("./services/routes/user")

module.exports = (app)=>{
    app.use('/auth',authRoutes)
}