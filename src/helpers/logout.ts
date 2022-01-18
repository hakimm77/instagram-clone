const logout = () => {
  localStorage.removeItem("USER");

  window.location.href = "/login";
};

export default logout;
