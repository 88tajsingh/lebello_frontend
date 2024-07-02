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
      } else if (res.status === 401) {
        
        return ;
      }
    } catch (err) {
      console.log("logout err", err);
    }
  };