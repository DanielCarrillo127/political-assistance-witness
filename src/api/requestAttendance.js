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

export const newAttendanceApi = async (data) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/newAttendance`,
      data,
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;

  } catch (error) {
    return error;
  }
};

export const deleteAttendanceApi = async (data) => {
  try {
    const req = await axios.delete(
      `${process.env.REACT_APP_API_URL}/deleteAttendance`,
      {
        headers: { 'authorization': `${localStorage.getItem('TOKEN')}` },
        data: data
      }
    );
    return req;

  } catch (error) {
    return error;
  }
};
