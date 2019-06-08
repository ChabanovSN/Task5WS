const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const send  = require('koa-send');
router.get('/', async (ctx) => {
   ctx.type = 'html';
  ctx.body = fs.createReadStream('./public/index.html');
});


module.exports = router;