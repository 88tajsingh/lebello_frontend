import LoginServices from "@/services/LoginServices";
import store from "@/store";
import _ from "lodash";
import moment from "moment";
import "moment-timezone";
import { useToast } from "vue-toast-notification";

const $toast = useToast();
/**
 * Checks if the given token is valid or not
 * @param {string} token - JWT token
 * @returns {boolean} - true if token is valid, false otherwise
 */
export function isAuthenticated(token) {
  return !!token;
}

/**
 * Clears the error message for a specific field in the errors object.
 * If no field is specified, the entire errors object is cleared.
 * @param {Object} errors - The errors object to clear.
 * @param {string} [field] - The field to clear the error message for.
 */
export function clearError(errors, field) {
  let fields = field || "";
  if (errors[fields]) {
    errors[fields] = null;
  }
}

/**
 * Checks if the given id exists in the given variable.
 * @param {Object} variable - The object containing the array of items to check.
 * @param {Number} id - The id to check for.
 * @returns {Boolean} - true if the id exists, false otherwise.
 */
export const isChecked = (variable, id) => {
  return variable.value.some((item) => item.id === id);
};

/**
 * Returns the full path of a file given its relative URL in the file
 * upload server. If no file URL is provided, returns the default image
 * URL set in the .env file.
 * @param {string} fileUrl - The relative URL of the file in the file
 * upload server.
 * @returns {string} - The full path of the file.
 */
export const filePath = (fileUrl) => {
  // console.log(`${import.meta.env.VITE_FILES_PATH}${fileUrl}`)
  if (fileUrl) return `${import.meta.env.VITE_FILES_PATH}${fileUrl}`;
  else return import.meta.env.VITE_DEFAULT_IMAGE;
};

/**
 * Given an array of objects containing title and id properties, returns an
 * object with the concatenated titles as the "mediaName" property and an array
 * of the ids as the "media_ids" property.
 * @param {Array.<Object>} data - The array of objects to process.
 * @returns {Object} - The resulting object with "mediaName" and "media_ids" properties.
 */
export const handleFiles = (data) => {
  const media_titles = data.map((item) => item.title);
  const mediaName = media_titles.join(", ");
  const media_ids = data.map((item) => item.id);
  return { mediaName, media_ids };
};


/**
 * Updates the imageData and form values for the given type of media.
 * @param {string} type - The type of media to update (e.g. "featured_image", "gallery", etc.).
 * @param {Array.<Object>} data - The array of objects containing the media data to update.
 * @param {boolean} [multiple=false] - Whether to update the form value with an array of media ids or a single media id.
 * @param {Object} imageData - The imageData object containing the media data for the form.
 * @param {Object} form - The form object containing the form values to update.
 */
export const handleFileUpdate = (type,data,imageData,form,multiple = false,) => {
  const media_titles = data.map((item) => item.title);
  const mediaName = media_titles.join(",");
  const media_ids = data.map((item) => item.id);
  imageData.value[type] = { isOpen: false, mediaName, images: data };
  form.value[type] = multiple ? media_ids : media_ids[0];
};

/**
 * Shows a toast notification with the given message, type, and position.
 * @param {string} message - The message to display in the toast.
 * @param {string} type - The type of toast to display (e.g. "success", "error", etc.).
 * @param {string} [tostPosition="top-right"] - The position of the toast (e.g. "top-right", "bottom-center", etc.).
 */
export const showToast = (message, type, tostPosition) => {
  let position = tostPosition || "top-right";
  $toast.open({
    message: message,
    type: type,
    position: position,
    duration: 3000,
  });
};

/**
 * Checks if the access token is close to expiring and refreshes it
 * if necessary. If the token is no longer valid, logs the user out.
 * @returns {Promise<string>} The current access token.
 */
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

/**
 * Returns a new object with only the properties from `data` that are marked as true in `filter`.
 * Useful for creating a new object with only the fields that have been changed in a form.
 * @param {Object} data - The object that contains the data to be filtered.
 * @param {Object} filter - The object that contains the filter criteria.
 * @returns {Object} A new object with only the filtered properties.
 */
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

/**
 * Checks if the user has the necessary permissions to perform a global update.
 *
 * @param {Object} form - The form object containing the value to be checked.
 * @returns {boolean} - Returns true if the user has the necessary permissions, false otherwise.
 */

export const checkPermissions = (form) => {
  console.log("tested")
};

/**
 * Handles error responses from API calls.
 * If the status is 403, it simply shows the error message.
 * If the status is 400, it shows the error message from the response data, or a default message if none is provided.
 * For any other status, it shows a default error message.
 * @param {number} status - The HTTP status code.
 * @param {Object} data - The response data from the API call.
 * @returns {void}
 */
export const handleErrorResponse = (status, data) => {
  console.log("Error Response:", status, data);
  if (status === 403) {
    console.log("403 error, showing error message");
    showToast(data?.message || data?.error, 'error');
  } else {
    const message = status === 400 ? (data?.message ||data?.error|| 'Something went wrong') : 'An error occurred';
    console.log(`Showing error message: ${message}`);
    showToast(message, 'error');
  }
};
