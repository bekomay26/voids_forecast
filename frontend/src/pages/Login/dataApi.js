import api from "../../api";

export const getProcurementData= async () => {
  return api.get(`procurement`);
};


export const getDirectorData= async () => {
  return await api.get('director');
};
