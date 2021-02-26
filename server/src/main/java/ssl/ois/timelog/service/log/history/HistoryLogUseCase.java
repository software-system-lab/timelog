package ssl.ois.timelog.service.log.history;

import ssl.ois.timelog.model.log.Log;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.log.LogDTO;
import ssl.ois.timelog.service.repository.log.LogRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class HistoryLogUseCase {
    private LogRepository logRepository;

    public HistoryLogUseCase(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public void execute(HistoryLogUseCaseInput input, HistoryLogUseCaseOutput output)
            throws ParseException, DatabaseErrorException {
        Date endDate;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        endDate = dateFormat.parse(input.getEndDate());
        Calendar c = Calendar.getInstance();
        c.setTime(endDate);
        c.add(Calendar.DATE, 1);
        endDate = c.getTime();

        List<Log> logList = this.logRepository.findByPeriod(input.getUserID(),
                input.getStartDate(), dateFormat.format(endDate));

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(Log.DATE_FORMAT);

        List<LogDTO> logDTOList = new ArrayList<>();
        if(input.getFilterList() == null){
            for (Log log: logList) {
                LogDTO logDTO = new LogDTO();
                logDTO.setId(log.getID().toString());
                logDTO.setActivityTypeName(log.getActivityTypeName());
                logDTO.setTitle(log.getTitle());
                logDTO.setStartTime(simpleDateFormat.format(log.getStartTime()));
                logDTO.setEndTime(simpleDateFormat.format(log.getEndTime()));
                logDTOList.add(logDTO);
            }
        } else {
            for (Log log: logList) {
                for(String filterName: input.getFilterList()) {
                    if(log.getActivityTypeName().equals(filterName)) {
                        LogDTO logDTO = new LogDTO();
                        logDTO.setId(log.getID().toString());
                        logDTO.setActivityTypeName(log.getActivityTypeName());
                        logDTO.setTitle(log.getTitle());
                        logDTO.setStartTime(simpleDateFormat.format(log.getStartTime()));
                        logDTO.setEndTime(simpleDateFormat.format(log.getEndTime()));
                        logDTOList.add(logDTO);
                    }
                }
            }
        }      

        output.setLogDTOList(logDTOList);
    }
}
