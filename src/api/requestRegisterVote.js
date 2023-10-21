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