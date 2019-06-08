
exports.seed = (knex, Promise) => {
  return knex('movies').del()
  .then(() => {
    return knex('movies').insert({
      name: 'Земля до начало времен',
      genre: 'Фантастика',
      rating: 7,     
      reff:'https://www.youtube.com/embed/hF0lIi_MSX0'
    });
  })
  .then(() => {
    return knex('movies').insert({
      name: 'Парк Юрского периода 1',
      genre: 'Научная фантастика',
      rating: 9,
      reff:'https://www.youtube.com/embed/qxKI154EcYw'
    });
  })
  .then(() => {
    return knex('movies').insert({
      name: 'Тарбозавр',
      genre: 'Научная фантастика',
      rating: 9,  
      reff:'https://www.youtube.com/embed/6X6EtxloVDQ'
    });
  })
  .then(() => {
    return knex('movies').insert({
      name: 'Тайны Доисторических Монстров',
      genre: 'Документальный',
      rating:5,  
      reff:'https://www.youtube.com/embed/gPtf0ggf1do'
    });
  })
  .then(() => {
    return knex('movies').insert({
      name: 'Ледниковый период: Эра динозавров',
      genre: 'Акшен',
      rating: 5,
      reff: 'https://www.youtube.com/embed/thuW0qbLjNE'
    });
  });
};