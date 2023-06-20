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

export const createEventsApi = async (eventData) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/newEvent`,
      eventData,
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;

  } catch (error) {
    return error;
  }
};

export const deleteEventsApi = async (eventData) => {
  try {
    const req = await axios.delete(
      `${process.env.REACT_APP_API_URL}/deleteEvent`,
      {
        headers: {
          'authorization': `${localStorage.getItem('TOKEN')}`
        },
        data:
          eventData
      }
    );
    return req;

  } catch (error) {
    return error;
  }
};


