package ssl.ois.timelog.cucumber.timebox;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import ssl.ois.timelog.adapter.repository.memory.MemoryUserRepository;
import ssl.ois.timelog.cucumber.common.UserLogin;
import ssl.ois.timelog.model.timebox.Timebox;
import ssl.ois.timelog.model.user.User;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.repository.user.UserRepository;
import ssl.ois.timelog.service.timebox.add.AddTimeboxUseCase;
import ssl.ois.timelog.service.timebox.add.AddTimeboxUseCaseInput;
import ssl.ois.timelog.service.timebox.add.AddTimeboxUseCaseOutput;

import java.util.List;

public class TimeboxStepDefinition {

    private UserRepository userRepository;
    private String userID;
    private User user;

    @Before
    public void setup() {
        this.userRepository = new MemoryUserRepository();
    }

    @Given("[timebox] I log in to Timelog with user ID {string}")
    public void timebox_I_log_in_to_Timelog_with_user_ID(String userID) {
        UserLogin userLoginService = new UserLogin(this.userRepository);
        try {
            userLoginService.process(userID);
            this.userID = userLoginService.getUserID();
            this.user = userLoginService.getUser();
        } catch (Exception e) {
            fail(e.getMessage());
        }
    }

    @When("I create a timebox with the title {string} and start date {string} due date {string}")
    public void i_create_a_timebox_with_the_title_and_start_date_due_date(String title, String startDate, String endDate) {
        AddTimeboxUseCase addTimeboxUseCase = new AddTimeboxUseCase(this.userRepository);
        AddTimeboxUseCaseInput input = new AddTimeboxUseCaseInput();
        AddTimeboxUseCaseOutput output = new AddTimeboxUseCaseOutput();

        input.setTitle(title);
        input.setUserID(this.user.getID().toString());
        input.setStartDate(startDate);
        input.setEndDate(endDate);
        try {
            addTimeboxUseCase.execute(input, output);
        } catch (DatabaseErrorException e) {
            e.printStackTrace();
            fail(e.getMessage());
        }
    }

    @Then("{string} has been created with the start date {string} due date {string}")
    public void has_been_created_with_the_start_date_due_date(String title, String startDate, String endDate) {
        boolean found = false;
        List<Timebox> timeboxList = this.user.getTimeboxList();
        for (Timebox timebox: timeboxList) {
            if(timebox.getTitle().equals(title) && timebox.getStartDate().equals(startDate) && timebox.getEndDate().equals(endDate)) {
                found = true;
            }
        }
        assertTrue(found);
    }
}