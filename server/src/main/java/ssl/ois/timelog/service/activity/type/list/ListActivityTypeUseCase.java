package ssl.ois.timelog.service.activity.type.list;

import org.springframework.stereotype.Service;

import ssl.ois.timelog.model.user.User;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.repository.user.UserRepository;

@Service
public class ListActivityTypeUseCase {

    private UserRepository userRepository;

    public ListActivityTypeUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void execute(ListActivityTypeUseCaseInput input, ListActivityTypeUseCaseOutput output)
            throws DatabaseErrorException {
        User user = this.userRepository.findByUserID(input.getUserID());

        output.setActivityTypeList(user.getActivityTypeList());
    }
}