package ssl.ois.timelog.service.repository.log;

import ssl.ois.timelog.model.log.Log;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.exception.log.GetLogErrorException;
import ssl.ois.timelog.service.exception.log.SaveLogErrorException;

import java.text.ParseException;
import java.util.List;
import java.util.UUID;

public interface LogRepository {
    void addLog(Log log) throws SaveLogErrorException;
    void updateLog(Log log, String targetID) throws GetLogErrorException, SaveLogErrorException;
    Log findByID(String id) throws GetLogErrorException;
    Boolean removeByID(String logID) throws GetLogErrorException, SaveLogErrorException;
    UUID findActivityUserMapperID(String userID, String activityTypeName) throws DatabaseErrorException;
    List<Log> findByPeriod(String userID, String startDate, String endDate) throws ParseException, DatabaseErrorException;
}
