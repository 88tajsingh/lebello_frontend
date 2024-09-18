import CommonServices from "@/services/CommonServices";
import MaterialsServices from "@/services/MaterialsServices";
import ContractServices from "@/services/ContractServices";
import ProductServices from "@/services/ProductServices";
import StoreServices from "@/services/StoreServices";
import PostServices from "@/services/PostServices";
import { showToast } from "./functions";
import store from "@/store";
// import { useRouter } from "vue-router";
import router from "@/router";
import ProjectServices from "@/services/ProjectServices";

// const router = useRouter();

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

  const setSidebar = async (payload) => {
    loading.value = true;

    try {
        const { status, data } = await CommonServices.getSideMenu(payload)
        if (status === 200 && data.success) {
            idsToFilter.value = data.data;
        }
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error('Error while fetching data:', error)
    } finally {
        loading.value = false;
    }
}