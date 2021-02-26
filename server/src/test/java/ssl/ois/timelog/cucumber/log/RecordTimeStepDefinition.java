package ssl.ois.timelog.cucumber.log;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import org.springframework.mock.web.MockHttpServletResponse;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class RecordTimeStepDefinition {
    @Autowired
    private MockMvc mvc;

    private MvcResult result;

    private GetLogByIdResponseBody resultLog;

    private RecordAPIRequestBody body;

    private String userID;

    public static String asJsonString(final Object obj) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(obj);
    }

    @Given("mvc I {string} from {string} to {string}, the description is {string}")
    public void i_from_to_the_description_is(String title, String startTime, String endTime, String description) {
        this.body = new RecordAPIRequestBody();
        this.body.setTitle(title);
        this.body.setStartTime(startTime);
        this.body.setEndTime(endTime);
        this.body.setDescription(description);
    }

    @Given("mvc My user ID is {string}")
    public void mvc_My_user_ID_is(String userID) {
        this.userID = userID;
    }

    @Given("mvc Activity type {string} is selected")
    public void activity_type_is_selected(String activityName) {
        this.body.setActivityTypeName(activityName);
    }

    @When("mvc I record the activity to Timelog")
    public void i_record_the_activity_to_Timelog() throws Exception {
        this.body.setUserID(this.userID);
        this.result = this.mvc.perform(MockMvcRequestBuilders
            .post("/api/log/record")
            .content(asJsonString(this.body))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
            .andReturn();
    }

    @Then("mvc A new log is added")
    public void a_new_log_is_added() throws Exception {
        // Write code here that turns the phrase above into concrete actions
        assertEquals(HttpStatus.OK.value(), this.result.getResponse().getStatus());
        assertTrue(this.result.getResponse().getContentAsString().contains("logID"));
        RecordAPIResponseBody recordResponse = new ObjectMapper().readValue(
                this.result.getResponse().getContentAsString(), RecordAPIResponseBody.class);
        assertNotNull(recordResponse.getLogID());

        GetLogByIdRequestBody getLogByIdRequestBody = new GetLogByIdRequestBody();
        MockHttpServletResponse response;

        getLogByIdRequestBody.setLogID(recordResponse.getLogID());
        response = this.mvc.perform(MockMvcRequestBuilders
                .post("/api/log/get/id")
                .content(asJsonString(getLogByIdRequestBody))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse();

        this.resultLog = new ObjectMapper().readValue(response.getContentAsString(), GetLogByIdResponseBody.class);
        assertNotNull(this.resultLog);
    }

    @Then("mvc This log has title {string}")
    public void this_log_has_title(String title) {
        assertEquals(title, this.resultLog.getTitle());
    }

    @Then("mvc This log has start time with {string}")
    public void this_log_has_start_time_with(String startTime) {
        assertEquals(startTime, this.resultLog.getStartTime());
    }

    @Then("mvc This log has end time with {string}")
    public void this_log_has_end_time_with(String endTime) {
        assertEquals(endTime, this.resultLog.getEndTime());
    }

    @Then("mvc This log has description {string}")
    public void this_log_has_description(String description) {
        assertEquals(description, this.resultLog.getDescription());
    }

    @Then("mvc This log has activity type {string}")
    public void this_log_has_activity_type(String activityType) {
        assertEquals(activityType, this.resultLog.getActivityTypeName());
    }

}

class RecordAPIRequestBody {
    private String userID;
    private String title;
    private String activityTypeName;
    private String startTime;
    private String endTime;
    private String description;

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getActivityTypeName() {
        return activityTypeName;
    }

    public void setActivityTypeName(String activityTypeName) {
        this.activityTypeName = activityTypeName;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

class RecordAPIResponseBody {
    private String logID;

    public void setLogID(String logID) {
        this.logID = logID;
    }

    public String getLogID() {
        return this.logID;
    }
}

class GetLogByIdRequestBody{
    private String logID;

    public void setLogID(String logID){
        this.logID = logID;
    }

    public String getLogID(){
        return this.logID;
    }

}

class GetLogByIdResponseBody{
    private String logId;
    private String title;
    private String startTime;
    private String endTime;
    private String activityTypeName;
    private String description;

    public void setLogId(String logId){
        this.logId = logId;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public void setStartTime(String startTime){
        this.startTime = startTime;
    }

    public void setEndTime(String endTime){
        this.endTime = endTime;
    }

    public void setActivityTypeName(String activityTypeName){
        this.activityTypeName = activityTypeName;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public String getLogId(){
        return this.logId;
    }

    public String getTitle(){
        return this.title;
    }

    public String getStartTime(){
        return this.startTime;
    }

    public String getEndTime(){
        return this.endTime;
    }

    public String getActivityTypeName(){
        return this.activityTypeName;
    }

    public String getDescription(){
        return this.description;
    }

}
