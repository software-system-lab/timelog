package ssl.ois.timelog.service.log.history;

import ssl.ois.timelog.service.log.LogDTO;

import java.util.ArrayList;
import java.util.List;

public abstract class HistoryLogUseCaseOutputBound implements HistoryLogUseCaseOutput {
    private List<LogDTO> logDTOList;

    public HistoryLogUseCaseOutputBound() {
        this.logDTOList = new ArrayList<>();
    }

    public List<LogDTO> getLogDTOList() {
        return logDTOList;
    }

    public void setLogDTOList(List<LogDTO> logDTOList) {
        this.logDTOList = logDTOList;
    }

}
