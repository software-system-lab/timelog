package ssl.ois.timelog.service.log.get;

import java.text.SimpleDateFormat;

import org.springframework.stereotype.Service;

import ssl.ois.timelog.model.log.Log;
import ssl.ois.timelog.service.exception.log.GetLogErrorException;
import ssl.ois.timelog.service.repository.log.LogRepository;

@Service
public class GetLogByIdUseCase {
    private LogRepository logRepository;

    public GetLogByIdUseCase(LogRepository repo) {
        this.logRepository = repo;
    }

    public void execute(GetLogByIdUseCaseInput input, GetLogByIdUseCaseOutput output)
            throws GetLogErrorException {
        Log log = this.logRepository.findByID(input.getLogID());


        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm");
        output.setLogId(log.getID().toString());
        output.setTitle(log.getTitle());
        output.setStartTime(dateFormat.format(log.getStartTime()));
        output.setEndTime(dateFormat.format(log.getEndTime()));
        output.setActivityTypeName(log.getActivityTypeName());
        output.setDescription(log.getDescription());

    }
}
