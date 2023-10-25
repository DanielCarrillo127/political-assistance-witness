import axios from "axios";

export const registerVotesApi = async (voteInfo) => {

  // const formData = new FormData();
  // formData.append('image', file);
  // formData.append('data', JSON.stringify(voteInfo));

  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/registerVote`,
      voteInfo
    );
    return req;
  } catch (error) {
    return error;
  }
};

export const registerCounterVotesApi = async (voteInfo) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/registerPartialCount`,
      voteInfo
    );
    return req;
  } catch (error) {
    return error;
  }
};

export const getVotesApi = async (status) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/getVotes`,
      status
    );
    return req;
  } catch (error) {
    return error;
  }
};

export const getGeneralStatusApi = async (userCedula) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/getGeneralStatus`,
      { "userCedula": userCedula },
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;
  } catch (error) {
    return error;
  }
};


export const updateVoteStatusApi = async (status) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/updateVoteStatus`,
      status
    );
    return req;
  } catch (error) {
    return error;
  }
};


export const getComplianceReportApi = async (userCedula) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/getComplianceReport`,
      { "userCedula": userCedula },
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;
  } catch (error) {
    return error;
  }
};

export const getMissingTablesReportApi = async (userCedula, votingBooth) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/getMissingTablesReport`,
      { "userCedula": userCedula, "votingBooth": votingBooth },
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;
  } catch (error) {
    return error;
  }
};

export const getGeneralReportApi = async (userCedula) => {
  try {
    const req = await axios.post(
      `${process.env.REACT_APP_API_URL}/getGeneralReport`,
      { "userCedula": userCedula},
      { headers: { 'authorization': `${localStorage.getItem('TOKEN')}` } }
    );
    return req;
  } catch (error) {
    return error;
  }
};
