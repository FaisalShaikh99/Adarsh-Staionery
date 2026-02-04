import { createSlice } from "@reduxjs/toolkit";

// Migrate legacy 'allUsers' key to 'users' if present and ensure we load users safely
if (localStorage.getItem("allUsers") && !localStorage.getItem("users")) {
  localStorage.setItem("users", localStorage.getItem("allUsers"));
  localStorage.removeItem("allUsers");
}

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null; // current user ka data nikalne ke liye
const allUsers = JSON.parse(localStorage.getItem("users")) || []; // all users ka data nikalne ke liye

const initialState = {
  user: currentUser || null,
  users: allUsers,
  form: {
    name: "",
    email: "",
    password: "",
    avatarUrl: null
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      const { field, value } = action.payload;
      state.form[field] = value;
    },

    register: (state) => {
      const { name, email, password, avatarUrl } = state.form;
      const normalizedEmail = email.trim().toLowerCase();
      const isExist = state.users.find(
        (user) => user.email && user.email.trim().toLowerCase() === normalizedEmail
      );

      // agar user exist nahi hai to naya user create hoga
      if (!isExist) {
        const newUser = { name: name.trim(), email: normalizedEmail, password: password.trim(), avatarUrl }; // new user ke liye object
        state.users.push(newUser);  // new user ka data users array me add hoga
        state.user = newUser; // aur user(current user) me bhi new user ka data set hoga
        // Persist users in localStorage under the correct key so Login reads them
        localStorage.setItem("users", JSON.stringify(state.users)); // users name ki key me local storage me ye data store hoga 
        localStorage.setItem("currentUser", JSON.stringify(newUser)); // currentUser name ki key me local storage me ye data store hoga
        // clear password from form for safety
        state.form.password = "";
      }
    },

    // Login existing user
    // authSlice.js

    login: (state, action) => {
      const { email, password } = action.payload;

      // ✅ Local login (normalize email and trim password)
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password.trim();
      const existingUser = state.users.find(
        (user) =>
          user.email &&
          user.email.trim().toLowerCase() === normalizedEmail &&
          user.password === normalizedPassword
      );

      if (existingUser) {
        state.user = existingUser;
        localStorage.setItem("currentUser", JSON.stringify(existingUser));

        state.form.name = existingUser.name;
        state.form.email = existingUser.email;
        state.form.avatarUrl = existingUser.avatarUrl || null;
        state.form.password = "";
      }
    },


    // Logout
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("currentUser");
      state.form = { name: "", email: "", password: "", avatarUrl: null };
    },

    // Delete account
    deleteAccount: (state) => {
      const updatedUsers = state.users.filter(
        (user) => state.user && user.email !== state.user.email
      );
      state.users = updatedUsers;
      state.user = null;
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.removeItem("currentUser");
      state.form = { name: "", email: "", password: "", avatarUrl: null };
    },

    // Edit profile
    editProfile: (state) => {
      const { name, email, password, avatarUrl } = state.form;


      if (!state.user) return;

      const updatedUsers = state.users.map((user) =>
        user.email === state.user.email
          ? { ...user, name, email, password, avatarUrl }
          : user
      );

      const updatedUser = { ...state.user, name, email, password, avatarUrl };
      state.user = updatedUser;
      state.users = updatedUsers;

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  }
});

export const {
  register,
  login,
  logout,
  deleteAccount,
  editProfile,
  updateForm
} = authSlice.actions;

export default authSlice.reducer;