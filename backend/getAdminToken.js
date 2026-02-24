import axios from "axios";

const getToken = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email: "admin@admin.com",
      password: "admin123"
    });

    console.log("✅ ADMIN TOKEN:\n");
    console.log(res.data.token);
  } catch (err) {
    console.error("❌ Failed to get token", err.response?.data);
  }
};

getToken();
