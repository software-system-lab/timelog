package ssl.ois.timelog.service.activity.type.add;

public class AddActivityTypeUseCaseInput {
    private String activityTypeName;
    private String userID;
    private boolean isEnable;
    private boolean isPrivate;

    public void setActivityTypeName(String activityTypeName) {
        this.activityTypeName = activityTypeName;
    }

    public String getActivityTypeName() {
        return activityTypeName;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getUserID() {
        return this.userID;
    }

    public void setIsEnable(boolean isEnable) {
        this.isEnable = isEnable;
    }

    public boolean getIsEnable() {
        return this.isEnable;
    }

    public void setIsPrivate(boolean isPrivate) {
        this.isPrivate = isPrivate;
    }

    public boolean getIsPrivate() {
        return this.isPrivate;
    }

}
