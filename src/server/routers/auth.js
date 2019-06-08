const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');
const queries = require('../db/queries/users');

const router = new Router();

router.get('/auth/register', async (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./public/auth/register.html');
});


router.get('/auth/status', async (ctx) => { 
  if (ctx.isAuthenticated()) {  
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./public/auth/status.html');
  } else {   
    ctx.redirect('/auth/login');
  }
});
router.post('/auth/register', async (ctx) => {
  try{
    const user = await queries.addUser(ctx.request.body);
    return passport.authenticate('local', (err, user, info, status) => {
      if (user) {
        ctx.login(user);     
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error' };
      }
    })(ctx);
  }catch(err){
    if(err.code ==='23505'){
        ctx.status = 400;
        ctx.body = { status: 'error_thesame_name' };
    }
  }
 
 
});








 


router.get('/auth/login', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./public/auth/login.html');
  } else {
    ctx.redirect('/auth/status');
  }
});


// router.get('/auth/login', async (ctx) => {
//   if (!ctx.isAuthenticated()) {
//     ctx.type = 'html';
//     ctx.body = fs.createReadStream('./public/auth/login.html');
//   } else {
//     ctx.redirect('/auth/status');
//   }
// });

// router.post('/auth/login', async (ctx) => {
//   return passport.authenticate('local', (err, user, info, status) => {
//     if (user) {
//       ctx.login(user);
//       ctx.redirect('/auth/status');
//     } else {
//       ctx.status = 400;
//       ctx.body = { status: 'error' };
//     }
//   })(ctx);
// });

router.post('/auth/login', async (ctx) => {
  return passport.authenticate('local', (err, user, info, status) => {
    console.log('login');
    if (user) {
     
      ctx.login(user);
      ctx.body = { status: 'success' };
      console.log('login good');
      // ctx.redirect('/auth/status');
    } else {
      console.log('login no good');
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx);
});


// router.post('/auth/login', async (ctx) => {  

//  passport.authenticate('local', {session: true});

//  const user = await queries.getUser(ctx.request.body);
 
//   if(user ==='error_password'){
//     ctx.status = 200;
//     ctx.body = {
//       status: 'error_password'
    
//     }; 
//   }else if(user ==='no_username'){
//     ctx.status = 200;
//     ctx.body = {
//       status: 'no_username'    
//     }; 

//   }else if(typeof user != "undefined" && user != null && user.length != null && user.length > 0){
//   ctx.login(user);
//    ctx.status = 200;
//    ctx.body = {
//           status: 'success',
//           username: user[0].username
//         }; 
//       }   
//    else {
//    ctx.status = 400;
//    ctx.body = { status: 'error_bd'};  
//   }
 
// });

router.get('/auth/logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/auth/login');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});


router.get('/api/v1/users', async (ctx) => {
  try {
    const users = await queries.getAllUsers();
    ctx.body = {
      status: 'success',
      data: users
    };
  } catch (err) {
    console.log(err)
  }
});

router.get('/auth/edit', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./public/auth/edit.html');
  } else {
    ctx.redirect('/auth/login');
  }
});

module.exports = router;