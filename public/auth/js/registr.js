new Vue({
  el: '#register',
  data: {
    username: '',
    password: '',
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
        url: '/auth/register',
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
        if (response.data.status === 'error_thesame_name') {
          alert('Пользователь с таким именем уже существует');
          window.location = '/auth/register';
        } else {
          window.location = '/auth/status';
        }
      });
    }

  }
});