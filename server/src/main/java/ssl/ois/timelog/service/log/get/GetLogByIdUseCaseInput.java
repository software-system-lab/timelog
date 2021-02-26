package ssl.ois.timelog.service.log.get;

public class GetLogByIdUseCaseInput {
    private String logID;
    
    public void setLogID(String logID) {
        this.logID = logID;
    }

    public String getLogID() {
        return this.logID;
    }
}
