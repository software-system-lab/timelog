package ssl.ois.timelog.adapter.presenter.log.history;

import ssl.ois.timelog.adapter.view.model.log.history.LogHistoryViewModel;
import ssl.ois.timelog.service.log.LogDTO;
import ssl.ois.timelog.service.log.history.HistoryLogUseCaseOutputBound;

public class LogHistoryPresenter extends HistoryLogUseCaseOutputBound {

    public LogHistoryViewModel build() {
        LogHistoryViewModel viewModel = new LogHistoryViewModel();
        for (LogDTO log: this.getLogDTOList()) {
            LogHistoryViewModel.LogItem logItem = new LogHistoryViewModel.LogItem();
            logItem.setID(log.getId());
            logItem.setActivityTypeName(log.getActivityTypeName());
            logItem.setTitle(log.getTitle());
            logItem.setStartTime(log.getStartTime());
            logItem.setEndTime(log.getEndTime());
            viewModel.addItem(logItem);
        }
        return viewModel;
    }
}
