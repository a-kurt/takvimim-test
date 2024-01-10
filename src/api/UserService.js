import axios from 'axios';

const APPOINTMENT_REST_API_URL = 'https://takvimim.up.railway.app';

class UserService {
  async getAppointments(endpoint) {
    try {
      const response = await axios.get(`${APPOINTMENT_REST_API_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  }
}

export default new UserService();