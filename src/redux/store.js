import { mailboxReducer } from "./mailbox/mailboxReducer";
import { configureStore } from "@reduxjs/toolkit";
import { timerReducer } from "./timer/timerSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productDetailsReducer } from "./productDetails/productDetailsSlice";
import { authReducer } from "./auth/authSlice";
import { contactsReducer } from "./contacts/contactsSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  Whitelist: ["token"],
  // blacklist: ['timer'],
};

export const store = configureStore({
  reducer: {
    mailbox: mailboxReducer,
    countDownTimer: timerReducer,
    productDetails: productDetailsReducer,
    auth: persistReducer(authPersistConfig, authReducer),
    phonebook: contactsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, REGISTER, PURGE, PERSIST],
      },
    }),
});

export const persistor = persistStore(store);
