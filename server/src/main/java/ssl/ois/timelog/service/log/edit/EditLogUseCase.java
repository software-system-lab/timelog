package ssl.ois.timelog.service.log.edit;

import java.util.UUID;

import org.springframework.stereotype.Service;

import ssl.ois.timelog.model.log.Log;
import ssl.ois.timelog.service.exception.log.SaveLogErrorException;
import ssl.ois.timelog.service.exception.log.GetLogErrorException;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.repository.log.LogRepository;


@Service
public class EditLogUseCase {
    private LogRepository logRepository;

    public EditLogUseCase(LogRepository logRepo) {
        this.logRepository = logRepo;
    }

    public void execute(EditLogUseCaseInput input, EditLogUseCaseOutput output) throws GetLogErrorException,DatabaseErrorException, SaveLogErrorException {
        UUID userID = UUID.fromString(input.getUserID());
        UUID activityUserMapperID = this.logRepository.findActivityUserMapperID(userID.toString(), input.getActivityTypeName());
        Log log = new Log(UUID.fromString(input.getLogID()),userID, input.getTitle(), input.getStartTime(), input.getEndTime(), input.getDescription(), input.getActivityTypeName(), activityUserMapperID);

        logRepository.updateLog(log, input.getLogID());
        output.setLogID(log.getID().toString());
    }
}
