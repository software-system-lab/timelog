import HTTP from './HttpRequest'

export default {
  async createTeam(name, code) {
    return HTTP.post(`/team/create`, {
      UserID: window.Profile.UserID,
      TeamName: name,
      TeamCode: code
    });
  },

  async joinTeam(name, code) {
    return HTTP.post(`/team/join`, {
      UserID: window.Profile.UserID,
      TeamName: name,
      TeamCode: code
    });
  },

  async getTeamName(teamID) {
    return HTTP.get(`/team/name?id=${teamID}`);
  }
}
