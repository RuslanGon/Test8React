import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  users: [],
  filter: "",
};

const mailboxSlice = createSlice({
  name: "mailbox",

  initialState: INITIAL_STATE,

  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },
    deleteUser(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

// Генератори екшенів
export const { addUser, deleteUser, setFilter } = mailboxSlice.actions;

// Редюсер слайсу
export const mailboxReducer = mailboxSlice.reducer;







// export const mailboxReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case "mailbox/ADD_USER": {
//         return {...state,
//             users: [...state.users, action.payload]}
//     }
//     case "mailbox/DELETE_USER": {
//         return {...state,
//             users: state.users.filter((user) => user.id !== action.payload)}
//     }
//     case "mailbox/SET_FILTER": {
//         return {...state,
//           filter: action.payload }
//     }

//     default:
//       return state;
//   }
// };
