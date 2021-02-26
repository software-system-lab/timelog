package ssl.ois.timelog.service.log.history;

import ssl.ois.timelog.service.log.LogDTO;

import java.util.List;

public interface HistoryLogUseCaseOutput {
    void setLogDTOList(List<LogDTO> logDTOList);
    List<LogDTO> getLogDTOList();
}
