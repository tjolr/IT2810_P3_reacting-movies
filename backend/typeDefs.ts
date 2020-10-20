import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Genre {
    id: Int
    name: String
  }

  type Keyword {
    id: Int
    name: String
  }

  type ProductionCompany {
    id: Int
    name: String
  }

  type ProductionCountry {
    iso_3166_1: String
    name: String
  }

  type SpokenLanguage {
    iso_639_1: String
    name: String
  }

  type Cast {
    cast_id: Int
    character: String
    credit_id: String
    gender: Int
    id: Int
    name: String
    order: Int
  }

  type Crew {
    credit_id: String
    department: String
    gender: Int
    id: Int
    job: String
    name: String
  }

  type Movie {
    _id: ID!
    budget: Int
    genres: [Genre]
    homepage: String
    id: Int
    keywords: [Keyword]
    original_language: String
    original_title: String
    overview: String
    popularity: Float
    production_companies: [ProductionCompany]
    production_countries: [ProductionCountry]
    release_date: String
    revenue: Int
    runtime: Int
    spoken_languages: [SpokenLanguage]
    status: String
    tagline: String
    title: String
    vote_average: Float
    vote_count: Int
    cast: [Cast]
    crew: [Crew]
  }

  input RatingFilter {
    rating_from: Float
    rating_to: Float
  }

  type SearchResult {
    movies: [Movie]
    totalPages: Int
    totalRowCount: Int
  }

  type Query {
    Movie(searchString: String, page: Int, rating: RatingFilter): SearchResult
  }
`;
