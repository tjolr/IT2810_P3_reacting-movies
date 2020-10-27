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
    release_date: Float
    revenue: Float
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
    from: Float
    to: Float
  }

  input ReleaseYearFilter {
    from: Int
    to: Int
  }

  input Filter {
    rating: RatingFilter
    release_year: ReleaseYearFilter
  }

  input Sort {
    field: String
    direction: SortDirection
  }

  enum SortDirection {
    asc
    desc
  }

  type SearchResult {
    movies: [Movie]
    totalPages: Int
    totalRowCount: Int
  }

  type Review {
    _id: ID!
    movie_id: String!
    text: String!
    author: String!
  }

  type Query {
    Movie(
      searchString: String
      page: Int
      filter: Filter
      sort: Sort
    ): SearchResult

    Reviews(movie_id: String): [Review]
  }

  input ReviewInput {
    movie_id: String
    text: String
    author: String
  }

  type Mutation {
    addReview(review: ReviewInput): Boolean
  }
`;
