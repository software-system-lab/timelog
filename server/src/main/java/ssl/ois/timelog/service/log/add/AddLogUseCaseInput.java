package ssl.ois.timelog.service.log.add;

public class AddLogUseCaseInput {
    private String userID;
    private String title;
    private String startTime;
    private String endTime;
    private String description;
    private String activityTypeName;

    public AddLogUseCaseInput() {
    }

    public AddLogUseCaseInput(String userID, String title, String startTime, String endTime, String description, String activityTypeName) {
        this.userID = userID;
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
        this.activityTypeName = activityTypeName;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getActivityTypeName() {
        return activityTypeName;
    }

    public void setActivityTypeName(String activityTypeName) {
        this.activityTypeName = activityTypeName;
    }

}
