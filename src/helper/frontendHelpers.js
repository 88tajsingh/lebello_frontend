import PublicServices from "@/services/publicServices/PublicServices";

export const scrollDown = (id) => {
    const targetDiv = document.getElementById(id);
    const startPosition = window.pageYOffset;
    const targetPosition = targetDiv.getBoundingClientRect().top + window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500; 
    let startTime = null;
  
    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  
    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed / duration) * distance + startPosition;
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, targetPosition);
      }
    };
    requestAnimationFrame(animateScroll);
  }

  export const scrollUp = (id) => {
    const targetDiv = document.getElementById(id);
    const startPosition = window.pageYOffset;
    const targetPosition = targetDiv.getBoundingClientRect().top + window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let startTime = null;
  
    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
  
    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed / duration) * distance + startPosition;
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, targetPosition);
      }
    };
  
    requestAnimationFrame(animateScroll);
  };
  

  const withDomain = async (service,payload,single=false,domainId) => {
    try {
      if(!domainId){
        const {status,data} = await PublicServices.getDomainData();
        if (single) {
          return { status, data };
        } else if(status === 200){
        const secondResponse = await service(data.data.id,payload);
        return secondResponse;       
      }
      else{
        const secondResponse = await service(domainId,payload);
        return secondResponse;   
      }
      }
      else{
      console.log("Something went wrong",data);
    }
    } catch (error) {
      console.error(` call error:`, error);
      throw error; 
    }
  };

  const withoutDomain = async (service,id) => {
    try {
      const res = await service(id);
      return res;   
    } catch (error) {
      console.error(`call error:`, error);
      throw error; 
    }
  };

// with domain apis 
  export const getLandingPageData = () => withDomain(PublicServices.getLandingPageData,null,false);
  export const getContractDesignData = () => withDomain(PublicServices.getContractDesign,null,false);
  export const getContractDesign = (slug) => withDomain(PublicServices.contractDesign,slug,false);
  export const getContractType = (slug) => withDomain(PublicServices.contractType,slug,false);
  export const getContractLocation = (slug) => withDomain(PublicServices.contractLocation,slug,false);
  export const getSwatchList = () => withDomain(PublicServices.frontendSwatchList,null,false);
  export const getSwatchDetail = (slug) => withDomain(PublicServices.swatchDetail,slug,false);
  export const getProductList = (slug) => withDomain(PublicServices.product_list,slug,false);
  export const getProductSeriesList = (slug) => withDomain(PublicServices.productSeriesList,slug,false);
  export const getProductTypeList = (slug) => withDomain(PublicServices.productTypeList,slug,false);
  export const getProductDetail = (slug) => withDomain(PublicServices.productDetail,slug,false);
  export const globalSearch = (slug) => withDomain(PublicServices.globalSearch,slug,false);


  // without domain apis
  // export const getSwatchList = (id) => withoutDomain(PublicServices.swatchDetail,id);
  // export const getProductList = (id) => withoutDomain(PublicServices.product_list,id);