import api from "../../api";

export const getProcurementData= async () => {
  return api.get(`procurement`);
};


export const getDirectorData= async () => {
  console.log(process.env.REACT_APP_API_URL)
  return await api.get('director');
};
