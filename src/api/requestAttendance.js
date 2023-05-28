import axios from "axios";

export const getAllAttendanceApi = async (userCedula, eventid) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/getAllAttendance`,
      { "userCedula": userCedula, "eventid": eventid },
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;

  } catch (error) {
    return error;
  }
};
