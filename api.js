const express = require('express')
const cors = require('cors');
const logger = require('morgan')
const session = require('express-session');
const app = express();
app.use(logger('dev'))
app.use(cors({
  origin:["http://localhost:3000"],
  credentials:true,
  allowedHeaders:"Content-Type,Authorization",
  methods:"GET,POST,DELETE,PUSH,PATH,OPTIONS,HEAD"
}));
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'zhufeng'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const users = [
  { id: '1', name: 'zhufeng1',createAt : new Date().toISOString() }, 
  { id: '2', name: 'zhufeng2',createAt : new Date().toISOString() }, 
  { id: '3', name: 'zhufeng3',createAt : new Date().toISOString() }
];
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: users
  });
});
app.get('/api/users/:id', (req, res) => {
  res.json({
    success: true,
    data: users.find(item=>item.id===req.params.id)
  });
});
app.post('/api/register',(req,res)=>{
  const user = req.body;
  user.id = Date.now()+''
  user.createAt = new Date().toISOString()
  users.push(user)
  res.json({
    success: true,
    data: user
  });
})
app.post('/api/login', (req, res) => {
  const user = req.body;
  req.session.user = user;
  res.json({
    success: true,
    data: user
  });
});
app.get('/api/logout', (req, res) => {
  req.session.user = null;
  res.json({
    success: true
  });
});
app.get('/api/user', (req, res) => {
  const user = req.session.user;
  if (user) {
    res.json({
      success: true,
      data: user
    });
  } else {
    res.json({
      success: false,
      error: '用户未登录'
    });
  }
});
app.listen(5000, () => console.log('api server started on port 5001'));