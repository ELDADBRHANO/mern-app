const express = require('express'),
 cors = require('cors'),
 dotEnv =require('dotenv').config();


const storeRouter = require('./server/routes/store')
const productRouter = require('./server/routes/products')
const ordersRouter = require('./server/routes/orders')
const departmentRouter = require('./server/routes/department')
const informationRouter = require('./server/routes/information')
const categoryRouter = require('./server/routes/category')
const usersRouter = require('./server/routes/user')
const passport = require('passport');
require('./server/config/passport')(passport);
const db = require('./server/DB')


const app = express();
const port = 5000


app.use(passport.initialize())
app.use(cors());
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use('/store',storeRouter)
app.use('/department',departmentRouter)
app.use('/information',informationRouter)
app.use('/categories',categoryRouter)
app.use('/users',usersRouter);
app.use('/orders',ordersRouter);
app.use('/products',productRouter);



app.get('/',(req,res)=>{
  res.send({message:"success"});
})

app.listen(port,()=>{
  console.log(`app is up on port:${port}`);
})



const PORT = process.env.PORT||5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res)=>{
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}