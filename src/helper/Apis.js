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
 * Handles API calls and responses.
 * @param {Function} service - The API service function to call.
 * @param {Object} payload - The data to send with the API request.
 * @return {Promise<Array<Object>>}
 */
const apiCall = async (service, payload) => {
  try {
    const res = await service(payload);
    if (res.status === 200) {
      return res.data.data || [];
    }
  } catch (err) {
    console.error(`${service.name} err`, err);
  }
  return [];
};

// Exported API calls
export const MaterialTreeList = (payload) => apiCall(MaterialsServices.MaterialTreeList, payload);
export const contractTypeTreeList = (payload) => apiCall(ContractServices.getAllContractType, payload);
export const contractLocationTreeList = (payload) => apiCall(ContractServices.getAllContractLocation, payload);
export const getAllCountries = (payload) => apiCall(CommonServices.allCountrys, payload);
export const getAllCurrenciesList = (payload) => apiCall(CommonServices.getAllCurrencies, payload);
export const getDomains = () => apiCall(CommonServices.getDomains);
export const getProductTypeTree = (payload) => apiCall(ProductServices.getProductTypeTreeList, payload);
export const getProductSeriesTree = (payload) => apiCall(ProductServices.getProductSeriesTreeList, payload);
export const getProductContractTree = (payload) => apiCall(ProductServices.getProductContractTreeList, payload);
export const getProductCategoryTypeTree = (payload) => apiCall(ProductServices.getProductCategoryTypeTreeList, payload);
export const getStoreCategoryTree = (payload) => apiCall(StoreServices.getStoreCategoryTreeList, payload);
export const getProjectCategoryTree = (payload) => apiCall(ProjectServices.getProjectCategoryTree, payload);
export const getPostCategoryTree = (payload) => apiCall(PostServices.getPostCategoryTreeList, payload);

/**
 * Makes an API call using the provided service and payload.
 * @param {Function} service - The API service function to call.
 * @param {Object} payload - The data to send with the API request.
 * @param {string} [route] - Optional route to navigate upon success.
 * @param {Ref<boolean>} [loading] - Optional loading state reference.
 */
export const commonApiCalls = async (service, payload, route, loading) => {
  try {
    const res = await service(payload);
    if (res.status === 200) {
      route && showToast(res.data.message, 'success');
      route && router.push(`/${route}`);
    } else if (res.status === 400) {
      showToast(res.data.message, 'error');
    }
  } catch (error) {
    showToast('Something went wrong', 'error');
    console.error('Error:', error);
  } finally {
    if (loading) loading.value = false;
  }
};

/**
 * Logs out the user and redirects to login page.
 */
export const logout = async () => {
  try {
    const res = await CommonServices.logout();
    if (res.status === 200) {
      store.dispatch('logout');
      router.push('/login');
    }
  } catch (err) {
    console.error("logout err", err);
  }
};
