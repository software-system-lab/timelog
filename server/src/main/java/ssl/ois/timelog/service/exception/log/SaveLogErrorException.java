package ssl.ois.timelog.service.exception.log;

public class SaveLogErrorException extends Exception{
    public SaveLogErrorException(String logName) {
        super("Error occurred during saving " + logName);
    }
}