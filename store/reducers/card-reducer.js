import {
  GET_ALL_CARDS,
  GET_ALL_MECHANICS,
  START_CARDS_LODAING,
  FAILED_CARDS_LOADING,
} from '../types/card-types';

const initialState = {
  cardsLoading: false,
  cards: [],
  mechanics: [],
};

const CardReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_CARDS_LODAING:
      return {
        ...state,
        cardsLoading: true,
      };
    case GET_ALL_CARDS:
      return {
        ...state,
        cards: action.payload,
        cardsLoading: false,
      };
    case GET_ALL_MECHANICS:
      return {
        ...state,
        mechanics: action.payload,
      };
    case FAILED_CARDS_LOADING:
      return {
        ...state,
        cardsLoading: false,
      };
    default:
      return state;
  }
};

export default CardReducer;
