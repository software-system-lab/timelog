package ssl.ois.timelog.service.log.add;

import java.util.UUID;

import org.springframework.stereotype.Service;

import ssl.ois.timelog.model.log.Log;
import ssl.ois.timelog.service.exception.log.SaveLogErrorException;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.repository.log.LogRepository;

@Service
public class AddLogUseCase {
    private LogRepository logRepository;

    public AddLogUseCase(LogRepository logRepo) {
        this.logRepository = logRepo;
    }

    public void execute(AddLogUseCaseInput input, AddLogUseCaseOutput output) throws SaveLogErrorException,DatabaseErrorException {
        UUID userID = UUID.fromString(input.getUserID());
        UUID activityUserMapperID = this.logRepository.findActivityUserMapperID(userID.toString(), input.getActivityTypeName());

        Log log = new Log(userID, input.getTitle(), input.getStartTime(), input.getEndTime(), input.getDescription(), input.getActivityTypeName(), activityUserMapperID);
        logRepository.addLog(log);
        output.setLogID(log.getID().toString());
    }
}
