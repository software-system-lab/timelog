package ssl.ois.timelog.service.exception;

public class DatabaseErrorException extends Exception{
    public DatabaseErrorException() {
        super("Error occurred during communicating with database");
    }
}