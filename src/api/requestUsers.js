import axios from "axios";

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

export const getAllUsersApi = async (userCedula) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/getAllUsers`,
      { "userCedula": userCedula },
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;

  } catch (error) {
    return error;
  }
};

export const getAllVotersByCoordinatorApi = async (userCedula, CoordinatorId) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/getAllVotersByCoordinator`,
      { "userCedula": userCedula, "CoordinatorCedula": CoordinatorId },
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;

  } catch (error) {
    return error;
  }
};

export const getAllVotersByLeaderApi = async (userCedula, leaderId) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/getAllVotersByLeader`,
      { "userCedula": userCedula, "LeaderCedula": leaderId },
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;

  } catch (error) {
    return error;
  }
};

export const getAllLeadersApi = async (userCedula) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/getAllLeaders`,
      { "userCedula": userCedula },
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;

  } catch (error) {
    return error;
  }
};

export const getAllCoordinatorsApi = async (userCedula) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/getAllCoordinators`,
      { "userCedula": userCedula },
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;

  } catch (error) {
    return error;
  }
};

export const getAllLeadersByCoordinatorsApi = async (userCedula, CoordinatorId) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/getAllLeadersByCoordinators`,
      { "userCedula": userCedula, "CoordinatorCedula": CoordinatorId },
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;

  } catch (error) {
    return error;
  }
};

export const deleteUserApi = async (deleteId) => {
  try {
    const req = await axios.delete(
      `${process.env.REACT_APP_API_URL}/deleteUser?cedula=${deleteId}`,
    );
    return req;
  } catch (error) {
    return error;
  }
};

export const setRoleApi = async (userCedula, userUpdateCedula, newRole) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/setRole`,
      { "userCedula": userCedula, "userUpdateCedula": userUpdateCedula, "newRole": newRole },
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;
  } catch (error) {
    return error;
  }
};

export const updateUserApi = async (body) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/updateUser`,
      body,
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;
  } catch (error) {
    return error;
  }
};

export const getCountData = async (userCedula) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/stats`,
      { "userCedula": userCedula },
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;

  } catch (error) {
    return error;
  }
};