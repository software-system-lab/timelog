import HTTP from './HttpRequest'
import moment from 'moment'

export default {
  publish(userID, startDate, endDate) {
    let postData = {
      UserID: userID,
      StartDate: moment(startDate).format("YYYY-MM-DD"),
      EndDate: moment(endDate).format("YYYY-MM-DD")
    }
    return HTTP.post(`/publish`, postData);
  }
}
