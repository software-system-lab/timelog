package ssl.ois.timelog.service.activity.type.list;

import java.util.List;

import ssl.ois.timelog.model.activity.type.ActivityType;

public class ListActivityTypeUseCaseOutput {
    private List<ActivityType> activityTypeList;

    public void setActivityTypeList(List<ActivityType> activityTypeList) {
        this.activityTypeList = activityTypeList;
    }

    public List<ActivityType> getActivityTypeList() {
        return this.activityTypeList;
    }
}