
export default function HaveToken() {
    const getToken = localStorage.getItem('token');
    const getUsername = localStorage.getItem('username');
  }
export function Logout() {
  
  localStorage.clear();

  window.location.reload()

}