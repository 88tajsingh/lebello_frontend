

// Authenticated user check
export function isAuthenticated(token) {
  return true;
    // if (token) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
  
  // clear error message from fields
  export function clearError (errors , field) {
    console.log("errors: " , errors , field);
    if (errors[field]) {
        errors[field] = '';
    }
};

// cehckbox 
export const isChecked = (variable,id) => {
  return variable.value.some(item => item.id === id);
};