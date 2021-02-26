package ssl.ois.timelog.service.exception.activity;

public class GetActivityTypeErrorException extends Exception {
    public GetActivityTypeErrorException() {
        super("Error occurred during getting activity types");
    }

    public GetActivityTypeErrorException(String activityTypeName) {
        super("Error occurred during getting activity type " + activityTypeName);
    }
}