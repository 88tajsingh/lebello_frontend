import { useToast } from "vue-toast-notification";
import store from "@/store";
import moment from "moment";
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
