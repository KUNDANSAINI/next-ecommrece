let API_URL;

if (typeof window !== 'undefined') {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    API_URL = 'http://localhost:3001';
  }
}

export { API_URL };
export const SESSION_KEY = "sk_test_51QWJYlKcnlVooVrVJYQYZIT2Oq8QiM9hkeXX3ujiuoTepyQ73rtUrNz7kc8BDYDF7x1yhMy5gQeONDkKsXEOktrf00Jj9IfagE"
export const PUBLISHABLE_KEY = "pk_test_51QWJYlKcnlVooVrVUbCMEChrUzojALx6ZUR1rSRDdGq7BvlZOhLjkzyht9oMUIPIRZOcLc5SfOG5HcWOUXgjG3Af00nIuPcLTL"
export const ENCRYPTION_KEY ='451874d0b918b40bb976687ed4820fe406f51dc07e8fe1aabdc5eb5eda253a7c'