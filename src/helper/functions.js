
import {useToast} from 'vue-toast-notification';
const $toast = useToast();
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
    let fields = field || '';
    if (errors[fields]) {
        errors[fields] = null;
    }
};

// cehckbox 
export const isChecked = (variable,id) => {
  return variable.value.some(item => item.id === id);
};

export const filePath = (fileUrl) =>{
  if(fileUrl)
   return `${import.meta.env.VITE_FILES_PATH}${fileUrl}`
  else
  return import.meta.env.VITE_DEFAULT_IMAGE
}

export const handleFiles = (data) => {
   const media_titles = data.map(item => item.title);
   const mediaName = media_titles.join(', ');
  const media_ids = data.map(item => item.id);
  return {mediaName , media_ids}
  
}


export const showToast = (message , type) => {
  $toast.open({
    message: message,
    type: type,
    position: 'top-right',
    duration: 3000,
  });
};