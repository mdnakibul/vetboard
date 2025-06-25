const AUTH_KEY = "isLoggedIn";

export function login() {
  localStorage.setItem(AUTH_KEY, "true");
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function isLoggedIn(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}
