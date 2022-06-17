import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

let result;



try {
  result = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
} catch (err) {
  result="";

}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${result}` },
});
