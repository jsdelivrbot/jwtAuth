import axios from 'axios';

const API_URL ='http://localhost:3090';

export const signinUser = ({ email, password }) => dispatch => (
  axios.post(`${API_URL}/signin`, { email, password })
    .then(res => {
      
    })
    .catch(() => {

    })
);
