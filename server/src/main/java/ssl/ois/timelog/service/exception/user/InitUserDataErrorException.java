package ssl.ois.timelog.service.exception.user;

public class InitUserDataErrorException extends Exception {
    public InitUserDataErrorException(String userID) {
        super("Error occurred during initializing user data for " + userID);
    }
}