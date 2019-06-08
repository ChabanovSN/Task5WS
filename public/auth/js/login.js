new Vue({
  el: '#login',
  data: {
    username: '',
    password: '',
    hidereff: false
  },
  methods: {
    enter() {
      if (this.username.length == 0) {
        alert('Логин не должен быть пустым');
        return;
      }
      if (this.password.length == 0) {
        alert('Пароль не должен быть пустым');
        return;
      }

      axios({
        method: 'post',
        url: '/auth/login',
        data: {
          username: this.username,
          password: this.password
        },
        validateStatus: (status) => {
          return true; 
        },
      }).catch(error => {
        alert('У нас пробемы! Ааааааааа');
      }).then(response => {

        if (response.data.status === 'success') {
          this.user = response.data.username;
          this.hidereff = true;
          alert('Вы успешло авторизовались');
        } else if (response.data.status === 'error_password') {
          this.hidereff = false;
          alert('Ваш пароль не верен');
        } else if (response.data.status === 'no_username') {
          this.hidereff = false;
          alert('Пользователь с таким логином не рарегистрирован');
        }else if (response.data.status === 'error_bd') {
          this.hidereff = false;
          alert('У нас пробемы! Ааааааааа');
        }
        
        // if (response.data.status === 'error_thesame_name') {
        //   alert('Пользователь с таким именем уже существует');
        //   window.location = '/auth/register';
        //  else {
        //   window.location = '/auth/status';
        // }
      });
    }

  }
  
});