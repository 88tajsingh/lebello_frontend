import CommonServices from "@/services/CommonServices";
import MaterialsServices from "@/services/MaterialsServices";
import ContractServices from "@/services/ContractServices";
import ProductServices from "@/services/ProductServices";
import StoreServices from "@/services/StoreServices";
import PostServices from "@/services/PostServices";
import { showToast } from "./functions";
import store from "@/store";
import router from "@/router";
import ProjectServices from "@/services/ProjectServices";


/**
 * Logs out the user and redirects to login page
 * 
 * @returns {void}
 */
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

  /**
   * Get Material Tree List
   * @param {Object} payload
   * @return {Promise<Array<Object>>}
   */
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

  /**
   * Get Contract Type Tree
   * @param {Object} payload
   * @return {Promise<Array<Object>>}
   */
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

  /**
   * Get contract location tree
   * @param {Object} payload
   * @return {Promise<Array<Object>>}
   */
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
/**
 * Get list of all countries
 * @param {Object} payload
 * @return {Promise<Array<Object>>}
 */
/*************  ✨ Codeium Command ⭐  *************/
/******  9f6b6455-bed0-403f-a9e0-232a3597fc6b  *******/
    try {
      const res = await CommonServices.allCountrys(payload);
      if (res.status === 200) {
        return  res.data.data ||[];
      } 
    } catch (err) {
      console.log("getAllCountries err", err);
    }
  };
  
/**
 * Get list of all currencies
 * @param {Object} payload
 * @return {Promise<Array<Object>>}
 */
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

/**
 * Get all domains
 * @return {Promise<Array<Object>>}
 */
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
  
/**
 * Get Product Type Tree
 * @param {Object} payload
 * @return {Promise<Array<Object>>}
 */
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
  
/**
 * Get Product Series Tree
 * @param {Object} payload
 * @return {Promise<Array<Object>>}
 */
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
  
/**
 * Get Product Category Type Tree
 * @param {Object} payload
 * @return {Promise<Array<Object>>}
 */
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
/**
 * Get Store Category Tree
 * @param {Object} payload
 * @return {Promise<Array<Object>>}
 */
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



/**
 * Get Project Category Tree
 * @param {Object} payload
 * @return {Promise<Array<Object>>}
 */
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

  /**
   * Get Post Category Tree
   * @param {Object} payload
   * @return {Promise<Array<Object>>}
   */
  export const getPostCategoryTree = async (payload) => {
    try {
      const res = await PostServices.getPostCategoryTreeList(payload);
      if (res.status === 200) {
        return  res.data.data || [];
      } 
    } catch (err) {
      console.log("getProductCategoryTypeTreeList err", err);
    }
  };

  
  /** 
 * Makes an API call using the provided service and payload.
 * @param {Function} service - The API service function to call (e.g., CommonServices.editTags).
 * @param {Object} payload - The data to send with the API request.
 * @param {string} [route] - Optional. The route to navigate to upon successful response.
 * @param {Ref<boolean>} [loading] - Optional. A ref that controls the loading state; set to false in the finally block.
 * 
 */
  export const commonApiCalls = async (service,payload,route,loading) => {
    try {
      const res = await service(payload);
  
      if (res.status === 200) {
        route &&showToast(res.data.message, 'success')
        route && router.push(`/${route}`)
      } else if (res.status === 400) {
        showToast(res.data.message, 'error')
      }
    } catch (error) {
      showToast('Something went wrong', 'error')
      console.error('Error:', error)
    } finally {
     if(loading) loading.value = false
    }
  };
