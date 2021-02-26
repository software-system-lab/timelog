package ssl.ois.timelog.service.user.enter;

import ssl.ois.timelog.model.activity.type.ActivityType;
import ssl.ois.timelog.model.log.Log;

import java.util.List;


public class EnterUseCaseOutput {
    private List<ActivityType> activityTypeList;
    private List<Log> logList;

    public void setActivityTypeList(List<ActivityType> activityTypeList) {
        this.activityTypeList = activityTypeList;
    }

    public List<ActivityType> getActivityTypeList() {
        return this.activityTypeList;
    }

    public void setLogList(List<Log> logList) {
        this.logList = logList;
    }

    public List<Log> getLogList() {
        return this.logList;
    }
}
