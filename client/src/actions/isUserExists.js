import axios from 'axios'
export const isUserExists = (identifier) => {
  return (dispatch) => {
    return axios.get(`/api/user/${identifier}`, identifier);
  };
};