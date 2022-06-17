import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
let result;

try {
  result = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
} catch (err) {
  result="";

}

//console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).accessToken);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${result}` },
});

