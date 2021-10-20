import { SET_REGIST_INFO } from "../actionTyps";
import { SET_LOGIN_INFO } from "../actionTyps";

export const setLoginInfo = (payload) => ({
  type: SET_LOGIN_INFO,
  payload,
});

export const setRegistInfo = (payload) => ({
  type: SET_REGIST_INFO,
  payload,
});
