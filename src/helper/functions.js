import LoginServices from "@/services/LoginServices";
import store from "@/store";
import _ from "lodash";
import moment from "moment";

export const isAuthenticated = (token) => !!token;

/**
 * Resets error messages for the given field or all fields if no field is provided
 *
 * @param {Object} errors - The object containing error messages
 * @param {String} [field] - The field to reset error messages for
 */
export const clearError = (errors, field) => {
  if (field) errors[field] = null;
  else Object.keys(errors).forEach(key => (errors[key] = null));
};

export const isChecked = (variable, id) => variable.value.some(item => item.id === id);

/**
 * Returns the full URL of a file.
 *
 * If fileUrl is truthy, it is appended to the VITE_FILES_PATH environment variable.
 * If fileUrl is falsy, the VITE_DEFAULT_IMAGE environment variable is returned.
 *
 * @param {string} fileUrl - The URL of the file
 * @returns {string} - The full URL of the file
 */
export const filePath = (fileUrl) =>
  fileUrl ? `${import.meta.env.VITE_FILES_PATH}${fileUrl}` : import.meta.env.VITE_DEFAULT_IMAGE;
export const normalFilePath = (fileUrl) =>`${import.meta.env.VITE_FILES_PATH}${fileUrl}`

/**
 * Handles the logic of updating a file in a form.
 *
 * @param {string} type - The type of file (e.g. "featured_image", "gallery", etc.)
 * @param {array} data - The array of files to update
 * @param {object} imageData - The object that holds the state of the files
 * @param {object} form - The form object that holds the data
 * @param {boolean} [multiple=false] - Whether the file type is a single file or multiple files
 */
export const handleFileUpdate = (type, data, imageData, form, multiple = false) => {
  const media_titles = data.map((item) => item.title);
  const mediaName = media_titles.join(", ");
  const media_ids = data.map((item) => item.id);
  imageData.value[type] = { isOpen: false, mediaName, images: data };
  form.value[type] = multiple ? media_ids : media_ids[0];
  console.log('multiple', form.value[type]);
  console.log('single', form.value[type]);
};

/**
 * Show a toast notification
 *
 * @param {string} message - The message to show
 * @param {string} type - The type of toast (success, error, warning, default)
 * @param {string} [position="top-right"] - The position to show the toast (top-right, top-center, top-left, bottom-right, bottom-center, bottom-left)
 */
export const showToast = async (message, type, position = "top-right") => {
  const { useToast } = await import("vue-toast-notification");
  const $toast = useToast();
  
  $toast.open({ message, type, position, duration: 3000 });
};

/**
 * Check if the token is near expiration and refresh it if needed
 *
 * @returns {string} The new token if it was refreshed, the original token if not
 */
export const checkAndRefreshToken = async () => {
  const REFRESH_BEFORE_EXPIRATION = 150;
  const expirationDateStr = store.getters["isTokenExpired"];
  const token = store.getters.token;

  if (!expirationDateStr) {
    console.warn("No token expiration date available.");
    return token;
  }

  const differenceInSeconds = moment.utc(expirationDateStr).local().diff(moment(), "seconds");

  if (token && differenceInSeconds > 0 && differenceInSeconds <= REFRESH_BEFORE_EXPIRATION) {
    try {
      const { data: { data: { access_token, expires_at } } } = await LoginServices.refreshToken({ refresh_token: token });
      store.dispatch("clearToken");
      store.dispatch("refreshToken", { token: access_token, expiresAt: expires_at });
    } catch {
      store.dispatch("logout");
    }
  }
  return token;
};

/**
 * Get data for global update
 *
 * @param {Object} data - Data to filter
 * @param {Object} filter - Filter object where keys are field names and values are boolean
 * @returns {Object} Filtered data for global update
 */
export const getGlobalUpdateData = (data, filter) =>
  Object.keys(filter).reduce((result, key) => {
    if (filter[key] && data[key] !== undefined) result[key] = data[key];
    return result;
  }, {});

/**
 * Validate a form field
 *
 * @param {string} key - The key in the form object to validate
 * @param {string} [fieldName] - The name of the field. If provided, it will be used in the error message.
 * @param {object} form - The form object containing the field to validate
 * @param {object} errors - The object to store the error message in
 * @param {string} [message] - The custom error message to use if the field is empty
 * @returns {boolean} - True if the field is valid, false if not
 */
export const validateForm = (key, fieldName, form, errors, message) => {
  errors.value = {};
  if (!form.value[key]) {
    errors.value[key] = fieldName ? `${fieldName} is required` : message;
    return false;
  }
  return true;
};

/**
 * @function checkForGlobalUpdate
 * @description Checks if a form is suitable for a global update.
 * @param {Object} form - Form data.
 * @returns {Boolean} Whether the form is suitable for a global update.
 */
export const checkForGlobalUpdate = (form) => {
  const value = form.value;
  return !_.isEmpty(value) && _.every(value, propValue => propValue === false);
};
