import axios from "axios";
// import { AxiosWithAuth } from "../utils/axiosAuth";

export const loginApi = async (cedula, password) => {
  const data = {
    cedula,
    password
  };
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/loginUser`,
      data
    );
    return req;
  } catch (error) {
    return error;
  }
};

export const registerApi = async (user) => {
  // const data = {
  // };
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/registerVoter`,
      user
    );
    return req;
  } catch (error) {
    return error;
  }
};