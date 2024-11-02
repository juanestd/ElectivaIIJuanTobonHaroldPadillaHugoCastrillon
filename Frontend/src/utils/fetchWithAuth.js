// Call endpoint with token
const fetchWithAuth = async (url, options = {}) => {
  const headerFactory = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const headers = { ...options.headers, ...headerFactory };

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (error) {
    if (error.message === "401") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("name");
    }
    console.error("Fetch error:", error);
    throw error;
  }
};

export default fetchWithAuth;
