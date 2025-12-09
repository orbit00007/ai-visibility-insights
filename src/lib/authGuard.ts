// Auth guard utilities

export const isUnauthorizedError = (error: any): boolean => {
  return error?.response?.status === 401;
};

export const handleUnauthorized = (): void => {
  // Clear all stored auth data
  localStorage.removeItem("access_token");
  localStorage.removeItem("application_id");
  localStorage.removeItem("first_name");
  localStorage.removeItem("applications");
  localStorage.removeItem("products");
  localStorage.removeItem("product_id");
  localStorage.removeItem("keywords");
  localStorage.removeItem("keyword_count");
  sessionStorage.clear();
  
  // Redirect to login
  window.location.href = "/login";
};
