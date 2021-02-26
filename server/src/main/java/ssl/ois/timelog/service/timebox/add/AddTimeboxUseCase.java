package ssl.ois.timelog.service.timebox.add;

import org.springframework.stereotype.Service;

import ssl.ois.timelog.model.timebox.Timebox;
import ssl.ois.timelog.model.user.User;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.repository.user.UserRepository;

@Service
public class AddTimeboxUseCase {
    private UserRepository userRepository;

    public AddTimeboxUseCase(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    
    public void execute(AddTimeboxUseCaseInput input, AddTimeboxUseCaseOutput output)
            throws DatabaseErrorException{
        User user = this.userRepository.findByUserID(input.getUserID());
        Timebox timebox = new Timebox(input.getTitle(), input.getStartDate(), input.getEndDate());
        user.addTimebox(timebox);

//        this.userRepository.save(user);
        
    }
}