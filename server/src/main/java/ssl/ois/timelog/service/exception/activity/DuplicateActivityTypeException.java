package ssl.ois.timelog.service.exception.activity;

public class DuplicateActivityTypeException extends Exception {
    public DuplicateActivityTypeException() {
        super("Duplicate activity type");
    }
}