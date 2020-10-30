import {gql} from '@apollo/client';

export const ADD_REVIEW = gql`
  mutation addReview($review: ReviewInput) {
    addReview(review: $review)
  }
`;
