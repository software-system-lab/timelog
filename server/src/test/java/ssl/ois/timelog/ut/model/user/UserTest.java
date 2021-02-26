package ssl.ois.timelog.ut.model.user;

import org.junit.Before;
import org.junit.Test;
import org.junit.Assert;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import ssl.ois.timelog.model.user.User;
import ssl.ois.timelog.model.activity.type.ActivityType;
import ssl.ois.timelog.service.exception.activity.ActivityTypeNotExistException;
import ssl.ois.timelog.service.exception.activity.DuplicateActivityTypeException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class UserTest {
    private static final double EPSILON = 0.001;
    private User user;
    private List<ActivityType> activityTypeList;
    private ActivityType operatedActivityType;
    private String targetActivityName;

    @Before
    public void setup() {
        UUID id = UUID.fromString("c61965be-8176-4419-b289-4d52617728fb");
        this.activityTypeList = new ArrayList<>();
        this.operatedActivityType = new ActivityType("Break", true, false);
        this.targetActivityName = "DP";
        this.user = new User(id, activityTypeList);

        ActivityType activityType = new ActivityType("DP", true, false);
        this.activityTypeList.add(activityType);
    }

    @Test
    public void getID() {
        assertEquals(UUID.fromString("c61965be-8176-4419-b289-4d52617728fb"), this.user.getID());
    }

    @Test
    public void addActivityType() {
        try {
            this.user.addActivityType(this.operatedActivityType);
        } catch (DuplicateActivityTypeException e) {
            fail(e.getMessage());
        }
        this.activityTypeList.add(this.operatedActivityType);

        assertEquals(this.activityTypeList, this.user.getActivityTypeList());
    }

    @Test
    public void getActivityTypeList() {
        assertEquals(activityTypeList, this.user.getActivityTypeList());
    }

}
