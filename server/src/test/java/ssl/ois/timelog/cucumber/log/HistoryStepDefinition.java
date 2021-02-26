package ssl.ois.timelog.cucumber.log;

import java.util.List;
import java.util.ArrayList;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import ssl.ois.timelog.adapter.presenter.log.history.LogHistoryPresenter;
import ssl.ois.timelog.adapter.repository.memory.MemoryLogRepository;
import ssl.ois.timelog.adapter.repository.memory.MemoryUserRepository;
import ssl.ois.timelog.cucumber.common.UserLogin;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.exception.log.SaveLogErrorException;
import ssl.ois.timelog.service.log.LogDTO;
import ssl.ois.timelog.service.log.add.AddLogUseCase;
import ssl.ois.timelog.service.log.add.AddLogUseCaseInput;
import ssl.ois.timelog.service.log.add.AddLogUseCaseOutput;
import ssl.ois.timelog.service.log.history.HistoryLogUseCase;
import ssl.ois.timelog.service.log.history.HistoryLogUseCaseInput;
import ssl.ois.timelog.service.log.history.HistoryLogUseCaseOutput;
import ssl.ois.timelog.service.repository.log.LogRepository;
import ssl.ois.timelog.service.repository.user.UserRepository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.text.ParseException;

public class HistoryStepDefinition {
    private UserRepository userRepository;
    private LogRepository logRepository;

    private String userID;
    private HistoryLogUseCaseOutput output;

    @Before
    public void setUp() {
        this.userRepository = new MemoryUserRepository();
        this.logRepository = new MemoryLogRepository();
    }

    @Given("[History] I log in to Timelog with user ID {string}")
    public void history_I_log_in_to_Timelog_with_user_ID(String userID) {
        UserLogin loginService = new UserLogin(this.userRepository);
        try {
            loginService.process(userID);
            this.userID = loginService.getUserID();
        } catch (Exception e) {
            fail(e.getMessage());
        }
    }

    @Given("[History] There is the first log with title {string} and start time {string} and end time {string} and description {string} and activity type {string} in my log history.")
    public void history_There_is_the_first_log_with_title_and_start_time_and_end_time_and_description_and_activity_type_in_my_log_history(
            String title, String startTime, String endTime, String description, String activityTypeName) {
        this.addLog(title, startTime, endTime, description, activityTypeName);
    }

    @Given("[History] There is the second log with title {string} and start time {string} and end time {string} and description {string} and activity type {string}")
    public void history_There_is_the_second_log_with_title_and_start_time_and_end_time_and_description_and_activity_type(
            String title, String startTime, String endTime, String description, String activityTypeName) {
        this.addLog(title, startTime, endTime, description, activityTypeName);
    }

    @Given("[History] There is the third log with title {string} and start time {string} and end time {string} and description {string} and activity type {string}")
    public void history_There_is_the_third_log_with_title_and_start_time_and_end_time_and_description_and_activity_type(
            String title, String startTime, String endTime, String description, String activityTypeName) {
        this.addLog(title, startTime, endTime, description, activityTypeName);
    }

    @When("[History] I request for the history between {string} and {string}")
    public void i_request_for_the_history_between_and(String startDate, String endDate) {
        HistoryLogUseCase useCase = new HistoryLogUseCase(this.logRepository);
        HistoryLogUseCaseInput input = new HistoryLogUseCaseInput();
        this.output = new LogHistoryPresenter();

        input.setUserID(this.userID);
        input.setStartDate(startDate);
        input.setEndDate(endDate);

        try {
            useCase.execute(input, this.output);
        } catch (ParseException | DatabaseErrorException e) {
            fail(e.getMessage());
        }
    }

    @Then("[History] I should get a list of logs with size of {int}")
    public void i_should_get_a_list_of_logs_with_size_of(Integer size) {
        assertEquals(size.intValue(), this.output.getLogDTOList().size());
    }

    @Then("[History] it should contain a log with title {string} and activity type {string} and start time {string} and end time {string}")
    public void it_should_contain_a_log_with_title_and_activity_type_and_start_time_and_end_time(
            String title, String activityTypeName, String startTime, String endTime) {
        boolean found = false;
        for(LogDTO logDTO: this.output.getLogDTOList()) {
            if(logDTO.getTitle().equals(title) &&
               logDTO.getActivityTypeName().equals(activityTypeName) &&
               logDTO.getStartTime().equals(startTime) &&
               logDTO.getEndTime().equals(endTime)) {
                found = true;
            }
        }
        assertTrue(found);
    }

    @When("[History] I request for the history between {string} and {string} with activity type {string} selected")
    public void history_I_request_for_the_history_between_and_with_activity_type_selected(
            String startDate, String endDate, String activityType) {
        HistoryLogUseCase useCase = new HistoryLogUseCase(this.logRepository);
        HistoryLogUseCaseInput input = new HistoryLogUseCaseInput();
        this.output = new LogHistoryPresenter();
        List<String> filterList = new ArrayList<>();
        filterList.add(activityType);

        input.setUserID(this.userID);
        input.setStartDate(startDate);
        input.setEndDate(endDate);
        input.setFilterList(filterList);

        try {
            useCase.execute(input, this.output);
        } catch (ParseException | DatabaseErrorException e) {
            fail(e.getMessage());
        }
    }

    @Then("[History] it should contain a log with and start time {string} and end time {string} and activity type {string} in my log dashboard.")
    public void history_it_should_contain_a_log_with_and_start_time_and_end_time_and_activity_type_in_my_log_dashboard(
            String startTime, String endTime, String activityTypeName) {
        boolean found = false;
        for(LogDTO logDTO: this.output.getLogDTOList()) {
            if(logDTO.getActivityTypeName().equals(activityTypeName) &&
                    logDTO.getStartTime().equals(startTime) &&
                    logDTO.getEndTime().equals(endTime)) {
                found = true;
            }
        }
        assertTrue(found);
    }

    private void addLog(String title, String startTime, String endTime, String description, String activityTypeName) {
        AddLogUseCase useCase = new AddLogUseCase(this.logRepository);
        AddLogUseCaseInput input = new AddLogUseCaseInput();

        input.setUserID(this.userID);
        input.setTitle(title);
        input.setStartTime(startTime);
        input.setEndTime(endTime);
        input.setDescription(description);
        input.setActivityTypeName(activityTypeName);
        try {
            useCase.execute(input, new AddLogUseCaseOutput());
        } catch (SaveLogErrorException | DatabaseErrorException e) {
            fail(e.toString());
        }
    }
}
