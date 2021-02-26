package ssl.ois.timelog.cucumber.log;

import static org.junit.Assert.assertNull;
import static org.junit.Assert.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.text.SimpleDateFormat;
import java.util.UUID;

import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import ssl.ois.timelog.adapter.repository.memory.MemoryLogRepository;
import ssl.ois.timelog.adapter.repository.memory.MemoryUserRepository;
import ssl.ois.timelog.cucumber.common.UserLogin;
import ssl.ois.timelog.model.log.Log;
import ssl.ois.timelog.service.repository.log.LogRepository;
import ssl.ois.timelog.service.exception.log.GetLogErrorException;
import ssl.ois.timelog.service.exception.log.SaveLogErrorException;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.log.add.*;
import ssl.ois.timelog.service.log.remove.RemoveLogUseCase;
import ssl.ois.timelog.service.log.remove.RemoveLogUseCaseInput;
import ssl.ois.timelog.service.log.remove.RemoveLogUseCaseOutput;
import ssl.ois.timelog.service.repository.user.UserRepository;
import io.cucumber.java.en.Then;

public class LogStepDefinition {
    private UserRepository userRepository;
    private LogRepository logRepository;
    private String title;
    private String startTime;
    private String endTime;
    private String description;
    private Log log;
    private String logID;
    private String userID;

    @Before
    public void setup() {
        this.userRepository = new MemoryUserRepository();
        this.logRepository = new MemoryLogRepository();
    }

    @Given("[Log] I log in to Timelog with user ID {string}")
    public void log_i_log_in_to_Timelog_with_user_ID(String userID) {
        UserLogin userLoginService = new UserLogin(this.userRepository);
        try {
            userLoginService.process(userID);
            this.userID = userLoginService.getUserID();
        } catch (Exception e) {
            fail(e.getMessage());
        }
    }

    @Given("I {string} from {string} to {string}, the description is {string}")
    public void i_from_to_the_description_is(String title, String startTime, String endTime, String description) {
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
    }

    @When("I add a log with activity type {string} to Timelog")
    public void i_add_a_log_with_activity_type_to_Timelog(String activityTypeName) {
        AddLogUseCase usecase = new AddLogUseCase(this.logRepository);
        AddLogUseCaseInput addLogUseCaseInput = new AddLogUseCaseInput();
        AddLogUseCaseOutput addLogUseCaseOutput = new AddLogUseCaseOutput();

        addLogUseCaseInput.setUserID(this.userID);
        addLogUseCaseInput.setTitle(this.title);
        addLogUseCaseInput.setStartTime(this.startTime);
        addLogUseCaseInput.setEndTime(this.endTime);
        addLogUseCaseInput.setDescription(this.description);
        addLogUseCaseInput.setActivityTypeName(activityTypeName);

        try {
            usecase.execute(addLogUseCaseInput, addLogUseCaseOutput);
        } catch (SaveLogErrorException | DatabaseErrorException e) {
            fail(e.getMessage());
        }

        this.logID = addLogUseCaseOutput.getLogID();
    }

    @Then("The log should be stored in the Timelog")
    public void the_log_should_be_stored_in_the_Timelog() {
        try {
            this.log = this.logRepository.findByID(this.logID);
        } catch (GetLogErrorException e) {
            fail(e.getMessage());
        }
        assertNotNull(this.log);
    }

    @Then("The log has title {string}")
    public void the_log_has_title(String title) {
        assertEquals(title, this.log.getTitle());
    }

    @Then("The log has start time with {string}")
    public void the_log_has_start_time_with(String startTime) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(Log.DATE_FORMAT);
        assertEquals(startTime, simpleDateFormat.format(this.log.getStartTime()));
    }

    @Then("The log has end time with {string}")
    public void the_log_has_end_time_with(String endTime) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(Log.DATE_FORMAT);
        assertEquals(endTime, simpleDateFormat.format(this.log.getEndTime()));
    }

    @Then("The log has description {string}")
    public void the_log_has_description(String description) {
        assertEquals(description, this.log.getDescription());
    }

    @Then("The log has activity type {string}")
    public void the_log_has_activity_type(String activityTypeName) {
        assertEquals(activityTypeName, this.log.getActivityTypeName());
    }

    @Given("I have added a log with title {string} and start time {string} and end time {string} and description {string} and activity type {string} before")
    public void i_have_added_a_log_with_title_and_start_time_and_end_time_and_description_and_activity_type_before(
            String title, String startTime, String endTime, String description, String activityTypeName) {
        try {
            this.logRepository.addLog(
                    new Log(UUID.fromString(this.userID), title, startTime, endTime, description, activityTypeName, this.logRepository.findActivityUserMapperID(this.userID,activityTypeName))
            );
        } catch (SaveLogErrorException | DatabaseErrorException e) {
            fail(e.getMessage());
        }
    }

    @When("I remove the log from my log history")
    public void i_remove_the_log_from_my_log_history() {
        RemoveLogUseCase removeLogUseCase = new RemoveLogUseCase(this.logRepository);
        RemoveLogUseCaseInput removeLogUseCaseInput = new RemoveLogUseCaseInput();
        RemoveLogUseCaseOutput removeLogUseCaseOutput = new RemoveLogUseCaseOutput();

        removeLogUseCaseInput.setLogID(this.logID);

        try {
            removeLogUseCase.execute(removeLogUseCaseInput, removeLogUseCaseOutput);
        } catch (GetLogErrorException | SaveLogErrorException e) {
            fail(e.getMessage());
        }
    }

    @Then("The log should be removed from my log history")
    public void the_log_should_be_removed_from_my_log_history() {
        try {
            assertNull(this.logRepository.findByID(this.logID));
        } catch (GetLogErrorException e) {
            fail(e.getMessage());
        }
    }
}
