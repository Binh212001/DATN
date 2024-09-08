import axios from "axios";

const vnApi = {
  getLocation: async () => {
    try {
      const { data } = await axios.get(
        "https://provinces.open-api.vn/api/?depth=2"
      );
      return data;
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  },
};

export default vnApi;
