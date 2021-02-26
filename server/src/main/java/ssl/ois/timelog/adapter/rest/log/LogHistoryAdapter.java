package ssl.ois.timelog.adapter.rest.log;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssl.ois.timelog.adapter.presenter.log.history.LogHistoryPresenter;
import ssl.ois.timelog.adapter.view.model.log.history.LogHistoryViewModel;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.log.history.HistoryLogUseCase;
import ssl.ois.timelog.service.log.history.HistoryLogUseCaseInput;
import ssl.ois.timelog.service.repository.log.LogRepository;

@RestController
@RequestMapping("/api/log/history")
public class LogHistoryAdapter {
    @Autowired
    private LogRepository logRepository;

    @PostMapping(value = "")
    public ResponseEntity<LogHistoryViewModel> history(@RequestBody HistoryLogUseCaseInput input) {
        HistoryLogUseCase useCase = new HistoryLogUseCase(this.logRepository);
        LogHistoryPresenter output = new LogHistoryPresenter();

        try {
            useCase.execute(input, output);
        } catch (ParseException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new LogHistoryViewModel());
        } catch (DatabaseErrorException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new LogHistoryViewModel());
        }
        return ResponseEntity.status(HttpStatus.OK).body(output.build());
    }

    @GetMapping(value = "")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.status(HttpStatus.OK).body("History is health");
    }
}
