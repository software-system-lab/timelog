package ssl.ois.timelog.adapter.rest.log;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssl.ois.timelog.adapter.presenter.log.dash.board.LogDashBoardPresenter;
import ssl.ois.timelog.adapter.view.model.log.dash.board.LogDashBoardViewModel;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.log.history.HistoryLogUseCase;
import ssl.ois.timelog.service.log.history.HistoryLogUseCaseInput;
import ssl.ois.timelog.service.repository.log.LogRepository;

@RestController
@RequestMapping("/api/dash-board/")
public class LogDashBoardAdapter {
    @Autowired
    private LogRepository logRepository;

    @PostMapping("/spent-time")
    public ResponseEntity<LogDashBoardViewModel> viewLogDashBoard(@RequestBody HistoryLogUseCaseInput input) {
        HistoryLogUseCase useCase = new HistoryLogUseCase(this.logRepository);

        LogDashBoardPresenter presenter = new LogDashBoardPresenter();

        try {
            useCase.execute(input, presenter);
            return ResponseEntity.status(HttpStatus.OK).body(presenter.build());
        } catch (ParseException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new LogDashBoardViewModel());
        } catch (DatabaseErrorException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new LogDashBoardViewModel());
        }
    }
}
