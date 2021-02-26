package ssl.ois.timelog.service.activity.type.remove;

public class RemoveActivityTypeUseCaseInput {
    private String activityTypeName;
    private String userID;

    public String getActivityTypeName() {
        return this.activityTypeName;
    }

    public void setActivityTypeName(String activityTypeName) {
        this.activityTypeName = activityTypeName;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getUserID(){
        return this.userID;
    }

}
