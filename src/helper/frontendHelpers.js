import PublicServices from "@/services/publicServices/PublicServices";

export const scrollDown = (id) => {
    console.log(id);
    const targetDiv = document.getElementById(id);
    console.log(targetDiv);
    const startPosition = window.pageYOffset;
    const targetPosition = targetDiv.getBoundingClientRect().top + window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Duration of the scroll in milliseconds
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

  const withDomain = async (service,payload,single=false) => {
    try {
      const {status,data} = await PublicServices.getDomainData();
      if (single) {
        return { status, data };
      } else if(status === 200){
      const secondResponse = await service(data.data.id,payload);
      return secondResponse;       
    }else{
      console.log("Something went wrong",status,data);
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
  export const getContractDesign = (id) => withDomain(PublicServices.contractDesign,id,false);
  export const getContractType = (id) => withDomain(PublicServices.contractType,id,false);
  export const getContractLocation = (id) => withDomain(PublicServices.contractLocation,id,false);
  export const getSwatchList = () => withDomain(PublicServices.frontendSwatchList,null,false);
  export const getSwatchDetail = (id) => withDomain(PublicServices.swatchDetail,id,false);
  export const getProductList = (id) => withDomain(PublicServices.product_list,id,false);
  export const getProductSeriesList = (id) => withDomain(PublicServices.productSeriesList,id,false);


  // without domain apis
  // export const getSwatchList = (id) => withoutDomain(PublicServices.swatchDetail,id);
