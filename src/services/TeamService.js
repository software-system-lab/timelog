import HTTP from './HttpRequest'

export default {
  async createTeam(name, code) {
    return HTTP.post(`api/team/create`, {
      UserID: window.Profile.UserID,
      TeamName: name,
      TeamCode: code
    });
  }
}