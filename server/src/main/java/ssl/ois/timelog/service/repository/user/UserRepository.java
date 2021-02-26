package ssl.ois.timelog.service.repository.user;

import ssl.ois.timelog.model.user.User;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.exception.activity.ActivityTypeNotExistException;
import ssl.ois.timelog.service.exception.activity.DuplicateActivityTypeException;

import java.util.UUID;

public interface UserRepository {
    void save(User user) throws DatabaseErrorException, DuplicateActivityTypeException, ActivityTypeNotExistException;
    User findByUserID(String userID) throws DatabaseErrorException;
    void addActivityType(User user) throws DatabaseErrorException, DuplicateActivityTypeException;
    void editActivityType(User user) throws DatabaseErrorException, DuplicateActivityTypeException, ActivityTypeNotExistException;
    void removeActivityType(User user) throws DatabaseErrorException, ActivityTypeNotExistException;
    UUID findActivityUserMapperID(String userID, String activityTypeName) throws DatabaseErrorException;
}
