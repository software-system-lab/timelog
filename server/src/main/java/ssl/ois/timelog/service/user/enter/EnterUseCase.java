package ssl.ois.timelog.service.user.enter;

import ssl.ois.timelog.model.activity.type.ActivityType;
import ssl.ois.timelog.model.log.Log;
import ssl.ois.timelog.model.user.User;
import ssl.ois.timelog.service.repository.log.LogRepository;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.exception.activity.ActivityTypeNotExistException;
import ssl.ois.timelog.service.exception.activity.DuplicateActivityTypeException;
import ssl.ois.timelog.service.exception.user.InitUserDataErrorException;
import ssl.ois.timelog.service.repository.user.UserRepository;

import java.util.UUID;

import org.springframework.stereotype.Service;

import java.util.ArrayList;

import org.apache.commons.logging.LogFactory;

@Service
public class EnterUseCase {
    private UserRepository userRepository;
    private LogRepository logRepository;
    private static org.apache.commons.logging.Log logger = LogFactory.getLog(EnterUseCase.class.getName());

    public EnterUseCase(UserRepository userRepository, LogRepository logRepository) {
        this.userRepository = userRepository;
        this.logRepository = logRepository;
    }


    public void execute(EnterUseCaseInput input, EnterUseCaseOutput output) throws DuplicateActivityTypeException,
            InitUserDataErrorException {
        try {
            String userID = input.getUserID();
            User user = this.userRepository.findByUserID(userID);
            if (user == null) {
                // First time login to Timelog
    
                // Create User
                user = new User(UUID.fromString(userID));
                this.userRepository.save(user);
    
                // Create default activity type "Other" for the user.
                ActivityType activityType = new ActivityType("Other", true, false);
                user.addActivityType(activityType);
                this.userRepository.addActivityType(user);

                ActivityType labDuty = new ActivityType("LabDuty", true, false);
                user.addActivityType(labDuty);
                this.userRepository.addActivityType(user);

                ActivityType labProject = new ActivityType("LabProject", true, false);
                user.addActivityType(labProject);
                this.userRepository.addActivityType(user);

                output.setActivityTypeList(this.userRepository.findByUserID(userID).getActivityTypeList());
                output.setLogList(new ArrayList<Log>());
            } else {
                output.setActivityTypeList(user.getActivityTypeList());
            }
        } catch (DatabaseErrorException | ActivityTypeNotExistException e) {
            logger.error(e);
            throw new InitUserDataErrorException(input.getUserID());
        }
    }
}
