const defaultReff = 'https://www.youtube.com/embed/tgbNymZ7vqY'; // на случай ошибки при коннекте с БД
var vm = new Vue({
  el: '#app',
  data: {
    movies: [], // все фильмы
    movie: [], // фильмы с похожим названием
    firstmovie: '',/// первый фильм в списке  movie: []
    search: '',
    defaultReff: defaultReff,
    selectMovieIndex: 0,
  },
  mounted() {
    axios
      .get('/api/v1/movies')
      .then((response) => {
        this.movies = response.data.data;
        this.defaultReff = this.movies.length>0 ? this.movies[0].reff : defaultReff;
      });
  }, 
  methods: {
    searchCansel() {      
      axios
        .get('/api/v1/movies')
        .then((response) => {
          this.movies = response.data.data;
          this.defaultReff = this.movies.length>0 ? this.movies[0].reff : defaultReff;
          this.firstmovie='';
           this.search='';
           this.movie= [];
        });
    },
    searchMovies() {
      if (this.search.length >0) {
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
    selectMovie(index) {
      this.selectMovieIndex = index;
      if(this.movie.length >0){
      this.firstmovie = this.movie[index]; 
      }else{
        this.firstmovie = this.movies[index]; 
      }
      this.defaultReff = this.firstmovie.reff;  
    }
  }
});