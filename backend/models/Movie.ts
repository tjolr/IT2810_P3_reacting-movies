const mongoose = require('mongoose');
const { Schema } = mongoose;

const GenreSchema = new Schema({
  id: Number,
  name: String,
});

const KeywordSchema = new Schema({
  id: Number,
  name: String,
});

const ProductionCompanySchema = new Schema({
  id: Number,
  name: String,
});

const ProductionCountrySchema = new Schema({
  iso_3166_1: String,
  name: String,
});

const SpokenLanguageSchema = new Schema({
  iso_639_1: String,
  name: String,
});

const CastSchema = new Schema({
  cast_id: Number,
  character: String,
  credit_id: String,
  gender: Number,
  id: Number,
  name: String,
  order: Number,
});

const CrewSchema = new Schema({
  credit_id: String,
  department: String,
  gender: Number,
  id: Number,
  job: String,
  name: String,
});

const movieSchema = new Schema({
  budget: Number,
  genres: [GenreSchema],
  homepage: String,
  id: Number,
  keywords: [KeywordSchema],
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  production_companies: [ProductionCompanySchema],
  production_countries: [ProductionCountrySchema],
  release_date: Date,
  revenue: Number,
  runtime: Number,
  spoken_languages: [SpokenLanguageSchema],
  status: String,
  tagline: String,
  title: String,
  vote_average: Number,
  vote_count: Number,
  cast: [CastSchema],
  crew: [CrewSchema],
});

export const Movie = mongoose.model('Movie', movieSchema);
