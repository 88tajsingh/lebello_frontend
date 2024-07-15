import CommonServices from "@/services/CommonServices";
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

export const MaterialTreeList = async () => {
    try {
      const res = await CommonServices.MaterialTreeList();
      if (res.status === 200) {
        console.log('MaterialTreeList data ',res.data.data)
        return  res.data.data;
      } 
    } catch (err) {
      console.log("MaterialTreeList err", err);
    }
  };