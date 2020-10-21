import { Schema, model, Document, Model } from 'mongoose';

// SCHEMA

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

// INTERFACE

interface Genre {
  id: number;
  name: string;
}

interface Keyword {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  name: string;
}

interface ProductionCountry {
  iso_3166_1: number;
  name: string;
}

interface SpokenLanguage {
  iso_639_1: number;
  name: string;
}

interface Cast {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  order: number;
}

interface Crew {
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  name: string;
}

export interface Movie extends Document {
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  keywords: Keyword[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  cast: Cast[];
  crew: Crew[];
}

// EXPORT

export const MovieModel: Model<Movie> = model<Movie>('Movie', movieSchema);
