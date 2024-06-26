export interface BookState {
  id: number;
  title: string;
  author: string;
  year: number;
}

export type BookAction =
  | { type: "LOAD"; payload: BookState[] }
  | { type: "ADD"; payload: BookState }
  | { type: "UPDATE"; payload: BookState }
  | { type: "DELETE"; payload: number };

export const BookReducer = (
  state: BookState[],
  action: BookAction
): BookState[] => {
  switch (action.type) {
    case "LOAD":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "UPDATE":
      return state.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );
    case "DELETE":
      return state.filter((book) => book.id !== action.payload);
    default:
      return state;
  }
};
