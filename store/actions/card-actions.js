import {
  GET_ALL_CARDS,
  GET_ALL_MECHANICS,
  START_CARDS_LODAING,
  FAILED_CARDS_LOADING,
} from '../types/card-types';

export const getAllCardsAction = (cards) => ({
  type: GET_ALL_CARDS,
  payload: cards,
});
export const getAllMechanicsAction = (mechanics) => ({
  type: GET_ALL_MECHANICS,
  payload: mechanics,
});
export const startCardsLoading = () => ({type: START_CARDS_LODAING});
export const failedCardsLoading = () => ({type: FAILED_CARDS_LOADING});
