

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

