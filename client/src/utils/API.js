import axios from "axios";

export default {
  saveData: function(data) {
    return axios.post("/api/users/save", data);
  },

  getWorkoutsByMonth: function(month, week, day, user) {
    return axios.get(`/api/users/find/${month}&${week}&${day}&${user}`);
  },

  createUser: function(data) {
    return axios.post("/api/users/user", data);
  },

  findUser: function(email) {
    return axios.get("/api/users/user/" + email);
  },

  findUserWorkOuts: function(id) {
    return axios.get("/api/users/workouts/" + id);
  },

  workOutByWeek: function(data) {
    return axios.get(
      `/api/users/week/${data.week}&${data.type}&${data.name}&${data.user}`
    );
  }
};
