package ssl.ois.timelog.service.log.remove;

import org.springframework.stereotype.Service;

import ssl.ois.timelog.service.exception.log.GetLogErrorException;
import ssl.ois.timelog.service.exception.log.SaveLogErrorException;
import ssl.ois.timelog.service.repository.log.LogRepository;

@Service
public class RemoveLogUseCase {
    private LogRepository logRepository;

    public RemoveLogUseCase(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public void execute(RemoveLogUseCaseInput input, RemoveLogUseCaseOutput output)
            throws GetLogErrorException, SaveLogErrorException {
        Boolean succeed = this.logRepository.removeByID(input.getLogID());
        output.setResult(succeed);
    }
}