import CommonServices from "@/services/CommonServices";
import MaterialsServices from "@/services/MaterialsServices";
import ContractServices from "@/services/ContractServices";
import store from "@/store";
import router from "@/router";

export const logout = async () => {
    try {
      const res = await CommonServices.logout();
      if (res.status === 200) {
            store.dispatch('logout');
            router.push('/login')
        return ;
      } 
    } catch (err) {
      console.log("logout err", err);
    }
  };

export const MaterialTreeList = async (payload) => {
    try {
      const res = await MaterialsServices.MaterialTreeList(payload);
      if (res.status === 200) {
        return  res.data.data || [];
      } 
    } catch (err) {
      console.log("MaterialTreeList err", err);
    }
  };
export const contractTypeTreeList = async () => {
    try {
      const res = await ContractServices.getAllContractType();
      if (res.status === 200) {
        return  res.data.data;
      } 
    } catch (err) {
      console.log("contractTypeTreeList err", err);
    }
  };
export const contractLoctionTreeList = async () => {
    try {
      const res = await ContractServices.getAllContractLocation();
      if (res.status === 200) {
        return  res.data.data ||[];
      } 
    } catch (err) {
      console.log("contractLoctionTreeList err", err);
    }
  };

export const getAllCountries = async () => {
    try {
      const res = await CommonServices.allCountrys();
      if (res.status === 200) {
        return  res.data.data ||[];
      } 
    } catch (err) {
      console.log("getAllCountries err", err);
    }
  };
  
export const getAllCurrenciesList = async () => {
    try {
      const res = await CommonServices.getAllCurrencies();
      if (res.status === 200) {
        return  res.data.data ||[];
      } 
    } catch (err) {
      console.log("getAllCurrenciesList err", err);
    }
  };

export const getDomins = async () => {
    try {
      const res = await CommonServices.getDomains();
      if (res.status === 200) {
        return  res.data.data ||[];
      } 
    } catch (err) {
      console.log("getDomins err", err);
    }
  };
  
