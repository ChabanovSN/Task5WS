const defaultReff = 'https://www.youtube.com/embed/tgbNymZ7vqY'; // на случай ошибки при коннекте с БД
var vm = new Vue({
  el: '#app',
  data: {
    movies: [], // все фильмы
    movie: [], // фильмы с похожим названием
    firstmovie: '',/// первый фильм в списке  movie: []
    search: '',   //  поле поиска видио
    defaultReff: defaultReff, //   ссылка на видио (по умолчанию)
    selectMovieIndex: 0, // для подсветки выбранного видео в списке
    modelVisabilityDelete: false, //  модальное окно удаления
    modelVisabilityUpdate: false, //  модальное окно обновления
    modelVisabilityCreate: false, // модальное окно создания
    newmovie: {  // атрибуты для создания нового видео  в модальном окне 
      name: '',
      genre: '',
      rating: '',
      reff: ''
    }
  },
  mounted() {   // отрисовка списка при загрузке страницы
    axios
      .get('/api/v1/movies')
      .then((response) => {
        this.movies = response.data.data;
        this.defaultReff = this.movies.length > 0 ? this.movies[0].reff : defaultReff;
      });
  },
  methods: {
    deleteMovie() {   // удаление видео    
      if (this.firstmovie.id) {
        axios
          .delete('/api/v1/movies/' + this.firstmovie.id)
          .then((response) => {
            this.searchCansel();
          });
      }
      this.modelVisabilityDelete = false;
    },
    cancelDelete() {
      this.modelVisabilityDelete = false;  // окнопка отмены удааления видео
    },
    update() {    // обновление видео
      if (this.firstmovie.id) {
        if (this.firstmovie.name == 0) {
          alert('Поле с названием не должено быть пустым');
          return;
        }
        if (this.firstmovie.genre == 0) {
          alert('Поле с жанра не должено быть пустым');
          return;
        }
        if (this.firstmovie.rating == 0) {
          alert('Поле с рейтингом не должено быть пустым');
          return;
        }
        if (this.firstmovie.reff == 0) {
          alert('Ссылка не должена быть пустым');
          return;
        }
        axios({
          method: 'put',
          url: '/api/v1/movies/' + this.firstmovie.id,
          data: {
            name: this.firstmovie.name,
            genre: this.firstmovie.genre,
            rating: this.firstmovie.rating,
            reff: this.firstmovie.reff
          },
          validateStatus: (status) => {
            return true;
          },
        }).catch(error => {
          alert('У нас пробемы! Ааааааааа');
        }).then(response => {
          this.searchCansel();
        })
      }
      this.modelVisabilityUpdate = false;
    },
    cancelUpdate() {  // кнопка отмены обновления
      this.modelVisabilityUpdate = false;
      this.searchCansel();
    },
    create() {      // создание нового видео
      if (this.newmovie.name == 0) {
        alert('Поле с названием не должено быть пустым');
        return;
      }
      if (this.newmovie.genre == 0) {
        alert('Поле с жанра не должено быть пустым');
        return;
      }
      if (this.newmovie.rating == 0) {
        alert('Поле с рейтингом не должено быть пустым');
        return;
      }
      if (this.newmovie.reff == 0) {
        alert('Ссылка не должено быть пустым');
        return;
      }

      axios({
        method: 'post',
        url: '/api/v1/movies/',
        data: {
          name: this.newmovie.name,
          genre: this.newmovie.genre,
          rating: this.newmovie.rating,
          reff: this.newmovie.reff
        },
        validateStatus: (status) => {
          return true;
        },
      }).catch(error => {
        alert('У нас пробемы! Ааааааааа');
      }).then(response => {
        this.newmovie.name = '';
        this.newmovie.genre = '';
        this.newmovie.rating = '';
        this.newmovie.reff = '';
        this.searchCansel();
      })
      this.modelVisabilityCreate = false;
    },
    cancelCreate() { // кнопка отмены создание видео
      this.modelVisabilityCreate = false;
      this.searchCansel();
    },
    searchCansel() {  // кнопка отмены поиска видео  
      axios
        .get('/api/v1/movies')
        .then((response) => {
          this.movies = response.data.data;
          this.defaultReff = this.movies.length > 0 ? this.movies[0].reff : defaultReff;
          this.firstmovie = '';
          this.search = '';
          this.movie = [];
          this.selectMovieIndex = 0;
        });
    },
    searchMovies() {  // поиск видео по частичному/полному совпадению 
      if (this.search.length > 0) {
        axios
          .get('/api/v1/movies/single/' + this.search)
          .then((response) => {
            if (response.data.status === 'success')
              this.movie = response.data.data;
            this.movies = this.movie;
            this.firstmovie = this.movie[0];
            this.defaultReff = this.firstmovie.reff;
          })
      } else {
        this.searchCansel();
      }
    },
    selectMovie(index) {  // для подсветки выбранного в списке видео
      this.selectMovieIndex = index;
      if (this.movie.length > 0) {
        this.firstmovie = this.movie[index]; // если сработал поиск видео
      } else {
        this.firstmovie = this.movies[index]; // без поиска в  общем списке
      }
      this.defaultReff = this.firstmovie.reff; // замена дефолтной ссылки выбраного видео
    }
  }
});