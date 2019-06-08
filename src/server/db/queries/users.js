const bcrypt = require('bcryptjs');
const knex = require('../connection');


 function addUser(user) { 
  const salt = bcrypt.genSaltSync();
  //const hash = bcrypt.hashSync(user.body.password, salt);
  const hash = bcrypt.hashSync(user.password, salt);
   try{
  return knex('users')
    .insert({

      username: user.username,
      password: hash,
      // username: user.body.username,
      // password: hash,
    })
    .returning('*');  
  }catch(err){
    console.log('query');
    console.log(err);
    // if(err.code === '23505')
    // return 'the_same_name';
  }
}

 function getAllUsers() {
  return knex('users')
    .select('*');
};

async function getUser(user) {

  try {
//console.log(user.body.username);
    const userbd = await knex('users')
      .where('username', user.username)
      .select('*');
  
    if (typeof userbd != "undefined" && userbd != null && userbd.length != null && userbd.length > 0) {
      const matches = await bcrypt.compare(user.body.password, userbd[0].password);
    
      if (matches) {

        return userbd;
      } else {
        return 'error_password';
      }
    } else {
      return 'no_username'
    }

  } catch (err) {
    console.log(err);
    return undefined;
  }
};
module.exports = {
  addUser,
  getAllUsers,
  getUser
};