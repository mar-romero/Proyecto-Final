import { loginFailure, loginStart, loginSuccess, logOut,logoutSuccess ,logoutFailure} from "./userRedux";
import { publicRequest } from "../requestMethods";
import{paymentOk,paymentFailure} from "../redux/paymentRedux";
import {logoutProduct} from "../redux/cartRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch, user) => {
  dispatch(logOut());
  try {
    const res = await publicRequest.delete("/auth/logout",  { mode: 'cors' },user);
    dispatch(logoutSuccess(res.data));
  } catch (err) {
    dispatch(logoutFailure());
  }
};

export const mpPayment = async (dispatch, amount) => {
  dispatch(paymentOk());
  try {
    const res = await publicRequest.post("/payment", amount);
    const link =  res.data.body.init_point;
    window.location.href = link;
    dispatch(logoutProduct(link));
  } catch (err) {
    dispatch(paymentFailure());
  }
};

