import axios from "axios";
import Axios_withoutInstance from "axios";

export const login = async (username: string, password: string) => {
    const data = {
      username,
      password,
    };
    try {
      const req = await Axios_withoutInstance.post(
        `${process.env.REACT_APP_API_URL}users/login`,
        data //process.env.UsersAPI
      );
      return req;
    } catch (error) {
      return error;
    }
  };