package ssl.ois.timelog.service.activity.type.edit;

import org.springframework.stereotype.Service;

import ssl.ois.timelog.model.activity.type.ActivityType;
import ssl.ois.timelog.model.user.User;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.exception.activity.ActivityTypeNotExistException;
import ssl.ois.timelog.service.exception.activity.DuplicateActivityTypeException;
import ssl.ois.timelog.service.repository.user.UserRepository;

import java.util.UUID;

@Service
public class EditActivityTypeUseCase {

    private UserRepository userRepository;

    public EditActivityTypeUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void execute(EditActivityTypeUseCaseInput input, EditActivityTypeUseCaseOutput output)
            throws DatabaseErrorException, DuplicateActivityTypeException, ActivityTypeNotExistException {
        User user = this.userRepository.findByUserID(input.getUserID());
        UUID activityUserMapperID = this.userRepository.findActivityUserMapperID(input.getUserID(),input.getTargetActivityTypeName());
        ActivityType activityType = new ActivityType(activityUserMapperID,input.getActivityTypeName(), input.getIsEnable(), input.getIsPrivate());

        user.editActivityType(input.getTargetActivityTypeName(), activityType);
        this.userRepository.editActivityType(user);
        output.setActivityTypeName(activityType.getName());
        output.setIsEnable(activityType.isEnable());
        output.setIsPrivate(activityType.isPrivate());
    }
}
