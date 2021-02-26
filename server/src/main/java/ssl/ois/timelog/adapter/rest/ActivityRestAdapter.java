package ssl.ois.timelog.adapter.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ssl.ois.timelog.service.activity.type.add.AddActivityTypeUseCase;
import ssl.ois.timelog.service.activity.type.add.AddActivityTypeUseCaseInput;
import ssl.ois.timelog.service.activity.type.add.AddActivityTypeUseCaseOutput;
import ssl.ois.timelog.service.activity.type.edit.EditActivityTypeUseCase;
import ssl.ois.timelog.service.activity.type.edit.EditActivityTypeUseCaseInput;
import ssl.ois.timelog.service.activity.type.edit.EditActivityTypeUseCaseOutput;
import ssl.ois.timelog.service.activity.type.list.ListActivityTypeUseCase;
import ssl.ois.timelog.service.activity.type.list.ListActivityTypeUseCaseInput;
import ssl.ois.timelog.service.activity.type.list.ListActivityTypeUseCaseOutput;
import ssl.ois.timelog.service.activity.type.remove.RemoveActivityTypeUseCase;
import ssl.ois.timelog.service.activity.type.remove.RemoveActivityTypeUseCaseInput;
import ssl.ois.timelog.service.activity.type.remove.RemoveActivityTypeUseCaseOutput;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.exception.activity.ActivityTypeNotExistException;
import ssl.ois.timelog.service.exception.activity.DuplicateActivityTypeException;

@RestController
@RequestMapping("/api/activity")
public class ActivityRestAdapter {
    @Autowired
    AddActivityTypeUseCase addActivityTypeUseCase;
    
    @Autowired
    ListActivityTypeUseCase listActivityTypeUseCase;

    @Autowired
    EditActivityTypeUseCase editActivityTypeUseCase;

    @Autowired
    RemoveActivityTypeUseCase removeActivityTypeUseCase;


    @PostMapping(value = "/add")
    public ResponseEntity<AddActivityTypeUseCaseOutput> addActivity(
            @RequestBody AddActivityTypeUseCaseInput requestBody) {
        AddActivityTypeUseCaseInput input = new AddActivityTypeUseCaseInput();
        AddActivityTypeUseCaseOutput output = new AddActivityTypeUseCaseOutput();

        input.setUserID(requestBody.getUserID());
        input.setIsEnable(requestBody.getIsEnable());
        input.setIsPrivate(requestBody.getIsPrivate());
        input.setActivityTypeName(requestBody.getActivityTypeName());
        try {
            addActivityTypeUseCase.execute(input, output);
        } catch (DuplicateActivityTypeException | ActivityTypeNotExistException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(output);
        } catch (DatabaseErrorException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(output);
        }
        return ResponseEntity.status(HttpStatus.OK).body(output);
    }

    @PostMapping(value = "/all")
    public ResponseEntity<ListActivityTypeUseCaseOutput> listAllActivities(@RequestBody ListActivityTypeUseCaseInput requestBody) {
        ListActivityTypeUseCaseInput input = new ListActivityTypeUseCaseInput();
        ListActivityTypeUseCaseOutput output = new ListActivityTypeUseCaseOutput();

        input.setUserID(requestBody.getUserID());
        
        try {
            listActivityTypeUseCase.execute(input, output);
        } catch (DatabaseErrorException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(output);
        }
        return ResponseEntity.status(HttpStatus.OK).body(output);
    }

    @PostMapping(value = "/edit")
    public ResponseEntity<EditActivityTypeUseCaseOutput> editActivity(
            @RequestBody EditActivityTypeUseCaseInput requestBody) {
        EditActivityTypeUseCaseInput input = new EditActivityTypeUseCaseInput();
        EditActivityTypeUseCaseOutput output = new EditActivityTypeUseCaseOutput();

        input.setUserID(requestBody.getUserID());
        input.setTargetActivityTypeName(requestBody.getTargetActivityTypeName());
        input.setActivtiyTypeName(requestBody.getActivityTypeName());
        input.setIsEnable(requestBody.getIsEnable());
        input.setIsPrivate(requestBody.getIsPrivate());

        try {
            editActivityTypeUseCase.execute(input, output);
        } catch (DuplicateActivityTypeException | ActivityTypeNotExistException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(output);
        } catch (DatabaseErrorException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(output);
        }
        return ResponseEntity.status(HttpStatus.OK).body(output);        
    }

    @PostMapping(value = "/remove")
    public ResponseEntity<RemoveActivityTypeUseCaseOutput> removeActivity(@RequestBody RemoveActivityTypeUseCaseInput requestBody) {
        RemoveActivityTypeUseCaseInput input = new RemoveActivityTypeUseCaseInput();
        RemoveActivityTypeUseCaseOutput output = new RemoveActivityTypeUseCaseOutput();

        input.setUserID(requestBody.getUserID());
        input.setActivityTypeName(requestBody.getActivityTypeName());

        try {
            removeActivityTypeUseCase.execute(input, output);
        } catch (DuplicateActivityTypeException | ActivityTypeNotExistException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(output);
        } catch (DatabaseErrorException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(output);
        }
        return ResponseEntity.status(HttpStatus.OK).body(output);
    }
}