import { SET_REGIST_INFO } from "../actionTyps";


const registState = {
  registInfo: {
    name: "",
    email: "",
    password: "",
    c_password: "",
  },
};





export const userReducer = (state = registState, action) => {
  switch (action.type) {
    case SET_REGIST_INFO:
      return {
        ...state,
        registInfo: action.payload,
      };
    default:
      return { ...state };
  }
};
