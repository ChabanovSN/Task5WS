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
  try {
    const user = await queries.addUser(ctx.request.body);
    return passport.authenticate('local', (err, user, info, status) => {
      if (user) {
        ctx.login(user);
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error' };
      }
    })(ctx);
  } catch (err) {
    if (err.code === '23505') {
      ctx.status = 400;
      ctx.body = { status: 'error_thesame_name' };
    }
  }


});
router.get('/auth/login', async (ctx) => { // на страницу логирование
  if (!ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./public/auth/login.html');
  } else {
    ctx.redirect('/auth/status');
  }
});

router.post('/auth/login', async (ctx) => {  // логирование
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.body = { status: 'success' };
    } else {
      ctx.status = 400;
      ctx.body = { status: 'no_username' };
    }
  })(ctx);
});

router.get('/auth/logout', async (ctx) => { // разлогиниться
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/auth/login');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});


router.get('/api/v1/users', async (ctx) => {  /// список всех пользавателей
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

router.get('/auth/edit', async (ctx) => { // перееход в режим редактирования
  if (ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./public/auth/edit.html');
  } else {
    ctx.redirect('/auth/login');
  }
});

module.exports = router;