import axios from "axios";

export const getAllEventsApi = async (userCedula) => {
    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL}/getAllEvents`,
        { "userCedula": userCedula },
        { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
      );
      return req;
  
    } catch (error) {
      return error;
    }
  };
  