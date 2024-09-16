import { useToast } from "vue-toast-notification";
import store from "@/store";
import moment from "moment";
import _ from "lodash";
import "moment-timezone";
import LoginServices from "@/services/LoginServices";

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
export function clearError(errors, field) {
  let fields = field || "";
  if (errors[fields]) {
    errors[fields] = null;
  }
}

// cehckbox
export const isChecked = (variable, id) => {
  return variable.value.some((item) => item.id === id);
};

// files path
export const filePath = (fileUrl) => {
  // console.log(`${import.meta.env.VITE_FILES_PATH}${fileUrl}`)
  console.log("fileUrl",fileUrl)
  if (fileUrl) return `${import.meta.env.VITE_FILES_PATH}${fileUrl}`;
  else return import.meta.env.VITE_DEFAULT_IMAGE;
};

// set ids and media names
export const handleFiles = (data) => {
  const media_titles = data.map((item) => item.title);
  const mediaName = media_titles.join(", ");
  const media_ids = data.map((item) => item.id);
  return { mediaName, media_ids };
};


// Function to handle file updates and processing
export const handleFileUpdate = (type, data, multiple = false, imageData, form) => {
  const media_titles = data.map((item) => item.title);
  const mediaName = media_titles.join(",");
  const media_ids = data.map((item) => item.id);
  imageData.value[type] = { isOpen: false, mediaName, images: data };
  form.value[type] = multiple ? media_ids : media_ids[0];
};

// toster method
export const showToast = (message, type, tostPosition) => {
  let position = tostPosition || "top-right";
  $toast.open({
    message: message,
    type: type,
    position: position,
    duration: 3000,
  });
};

// refresh token before expire token
export async function checkAndRefreshToken() {

  const REFRESH_BEFORE_EXPIRATION = 150; // in seconds
  const expirationDateStr = store.getters["isTokenExpired"];
  const token = store.getters.token;

  if (!expirationDateStr) {
    console.warn("No token expiration date available.");
  }
  const expirationDateUTC = moment.utc(expirationDateStr);
  const expirationDateLocal = expirationDateUTC.local();
  const currentDateLocal = moment();
  const differenceInSeconds = expirationDateLocal.diff(
    currentDateLocal,
    "seconds"
  );
  
  if (
    token &&
    differenceInSeconds > 0 &&
    differenceInSeconds <= REFRESH_BEFORE_EXPIRATION
  ) {
    try {
      const res = await LoginServices.refreshToken({ refresh_token: token });
      const { access_token, expires_at } = res.data.data;
      store.dispatch("clearToken");
      store.dispatch("refreshToken", {
        token: access_token,
        expiresAt: expires_at,
      });
    } catch (error) {
      store.dispatch("logout");
      return access_token;
    }
  }
  return token;
}

export function getGlobalUpdateData(data, filter) {
  return Object.keys(filter)
    .filter(key => filter[key] === true)
    .reduce((result, key) => {
      if (data.hasOwnProperty(key)) {
        result[key] = data[key];
      }
      return result;
    }, {});
}


/**
 * Validates a specific field in a form and updates the errors object accordingly.
 * 
 * @param {string} key - The key of the form field to validate.
 * @param {Ref<Object>} form - A ref object containing the form data.
 * @param {Ref<Object>} errors - A ref object that will be populated with validation errors.
 * @param {string} [fieldName] - Optional. The name of the field to use in the error message if it is required.
 * @param {string} message - The custom error message to use if the field is empty and `fieldName` is not provided.
 * 
 */
export const validateForm = (key,fieldName,form,errors,message) => {
  errors.value = {}
  if (!form.value[key]) {
    errors.value[key] = fieldName?`${fieldName} is required` :message
    return false
  }
  return true
}

/**
 * Checks if form.value is either empty or all its properties are false.
 *
 * @param {Object} form - The form object containing the value to be checked.
 * @returns {boolean} - Returns false if form.value is empty or if not all properties are false.
 */
export const checkForGlobalUpdate = (form) => {
  const value = form.value;
  if (_.isEmpty(value)) {
    return false;
  }
  return _.every(value, propValue => propValue === false);
};

export const checkPermissions = (form) => {
  console.log("tested")
};