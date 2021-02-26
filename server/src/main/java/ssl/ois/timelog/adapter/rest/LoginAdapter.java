package ssl.ois.timelog.adapter.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ssl.ois.timelog.service.exception.activity.DuplicateActivityTypeException;
import ssl.ois.timelog.service.exception.user.InitUserDataErrorException;
import ssl.ois.timelog.service.user.enter.EnterUseCase;
import ssl.ois.timelog.service.user.enter.EnterUseCaseInput;
import ssl.ois.timelog.service.user.enter.EnterUseCaseOutput;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

@RestController
@RequestMapping("/api/login")
public class LoginAdapter {
    @Autowired
    EnterUseCase enterUseCase;

    private static Log logger = LogFactory.getLog(LoginAdapter.class.getName());

    @PostMapping(value = "")
    public ResponseEntity<EnterUseCaseOutput> enterTimelog(@RequestBody EnterUseCaseInput input) {
        EnterUseCaseOutput output = new EnterUseCaseOutput();
        try {
            this.enterUseCase.execute(input, output);
        } catch (DuplicateActivityTypeException | InitUserDataErrorException e) {
            logger.error(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(output);
        }

        return ResponseEntity.status(HttpStatus.OK).body(output);
    }
}