const baseURL = 'http://172.105.152.65/lebello_backend/api/v1'

// Authenticated user check
export function isAuthenticated(token) {
  // return true;
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  
  // clear error message from fields
  export function clearError (errors , field) {
    console.log("errors: " , errors , field);
    if (errors[field]) {
        errors[field] = null;
    }
};

// cehckbox 
export const isChecked = (variable,id) => {
  return variable.value.some(item => item.id === id);
};

export const filePath = (fileUrl) =>{
   return `${baseURL}${fileUrl}`
}