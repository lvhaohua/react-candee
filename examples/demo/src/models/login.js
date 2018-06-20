import { actions } from "candee";
import { notification } from "antd";

export default {
  name: "login",

  initialState: {
    username: "",
    password: "",
    result: {}
  },

  reducers: {
    saveData: (state, data) => {
      return { ...state, ...data };
    }
  },

  effects: {
    loginRequest: (data, getState) => {
      const { username, password } = data;
      if (username === "admin" && password === "admin123") {
        setTimeout(() => {
          actions.login.saveData({ result: { code: 200, status: "success" } });
        }, 2000);
      } else {
        notification.error({
          message: "sorry!",
          description: "please try: admin && admin123 "
        });
      }
    }
  }
};
