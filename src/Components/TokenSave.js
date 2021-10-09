const TOKEN = 'token'

export function Logout() {
  
  localStorage.clear();
  window.location.reload()
}

export default class TokenSave {
  saveToken(token) {
    localStorage.setItem(TOKEN,token)
  }
  getToken() {
    return localStorage.getItem(TOKEN)
  }
  Logout() {
    localStorage.clear();
    window.location.reload();
    return;
  }
}