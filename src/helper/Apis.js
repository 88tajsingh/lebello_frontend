import CommonServices from "@/services/CommonServices";
import MaterialsServices from "@/services/MaterialsServices";
import ContractServices from "@/services/ContractServices";
import ProductServices from "@/services/ProductServices";
import StoreServices from "@/services/StoreServices";
import store from "@/store";
import router from "@/router";
import ProjectServices from "@/services/ProjectServices";

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
export const contractTypeTreeList = async (payload) => {
    try {
      const res = await ContractServices.getAllContractType(payload);
      if (res.status === 200) {
        return  res.data.data;
      } 
    } catch (err) {
      console.log("contractTypeTreeList err", err);
    }
  };
export const contractLoctionTreeList = async (payload) => {
    try {
      const res = await ContractServices.getAllContractLocation(payload);
      if (res.status === 200) {
        return  res.data.data ||[];
      } 
    } catch (err) {
      console.log("contractLoctionTreeList err", err);
    }
  };

export const getAllCountries = async (payload) => {
    try {
      const res = await CommonServices.allCountrys(payload);
      if (res.status === 200) {
        return  res.data.data ||[];
      } 
    } catch (err) {
      console.log("getAllCountries err", err);
    }
  };
  
export const getAllCurrenciesList = async (payload) => {
    try {
      const res = await CommonServices.getAllCurrencies(payload);
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
  
  export const getProductTypeTree = async (payload) => {
    try {
      const res = await ProductServices.getProductTypeTreeList(payload);
      if (res.status === 200) {
        return  res.data.data || [];
      } 
    } catch (err) {
      console.log("getProductTypeTreeList err", err);
    }
  };
  export const getProductSeriesTree = async (payload) => {
    try {
      const res = await ProductServices.getProductSeriesTreeList(payload);
      if (res.status === 200) {
        return  res.data.data || [];
      } 
    } catch (err) {
      console.log("getProductTypeTreeList err", err);
    }
  };
  export const getProductCategoryTypeTree = async (payload) => {
    try {
      const res = await ProductServices.getProductCategoryTypeTreeList(payload);
      if (res.status === 200) {
        return  res.data.data || [];
      } 
    } catch (err) {
      console.log("getProductCategoryTypeTreeList err", err);
    }
  };
  export const getStoreCategoryTree = async (payload) => {
    try {
      const res = await StoreServices.getStoreCategoryTreeList(payload);
      if (res.status === 200) {
        return  res.data.data || [];
      } 
    } catch (err) {
      console.log("getProductCategoryTypeTreeList err", err);
    }
  };

  export const getProductContractTree = async (payload) => {
    try {
      const res = await ProductServices.getProductContractTreeList(payload);
      if (res.status === 200) {
        return  res.data.data || [];
      } 
    } catch (err) {
      console.log("getProductCategoryTypeTreeList err", err);
    }
  };
  export const getProjectCategoryTree = async (payload) => {
    try {
      const res = await ProjectServices.getProjectCategoryTree(payload);
      if (res.status === 200) {
        return  res.data.data || [];
      } 
    } catch (err) {
      console.log("getProductCategoryTypeTreeList err", err);
    }
  };