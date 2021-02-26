package ssl.ois.timelog.cucumber;

import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.Assert.assertEquals;

public class HealthCheckTest {
    @Autowired
    private MockMvc mvc;
    private MvcResult result;

    @When("I perform get request to {string} path")
    public void i_perform_get_request_to_path(String rootPath) throws Exception {
        // Write code here that turns the phrase above into concrete actions
        ResultActions action = this.mvc.perform(MockMvcRequestBuilders.get(rootPath));
        this.result = action.andReturn();
    }

    @Then("I get status {int} and message {string} as response.")
    public void i_get_status_and_message_as_response(Integer status, String msg) throws Exception {
        // Write code here that turns the phrase above into concrete actions
        assertEquals(status, (Integer)this.result.getResponse().getStatus());
        assertEquals(msg, this.result.getResponse().getContentAsString());
    }
}
