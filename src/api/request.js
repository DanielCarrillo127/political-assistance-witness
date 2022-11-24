import axios from "axios";
// import { AxiosWithAuth } from "../utils/axiosAuth";

export const login = async (cedula, password) => {
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