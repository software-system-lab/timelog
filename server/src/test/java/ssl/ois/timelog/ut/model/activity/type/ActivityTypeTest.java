package ssl.ois.timelog.ut.model.activity.type;

import org.junit.Before;
import org.junit.Test;
import org.junit.Assert;
import ssl.ois.timelog.model.activity.type.ActivityType;

import static org.junit.Assert.assertEquals;

public class ActivityTypeTest {
    private static final double EPSILON = 0.001;
    private ActivityType activityType;

    @Before
    public void setup() {
        String name = "DP";
        boolean isEnable = true;
        boolean isPrivate = false;
        this.activityType = new ActivityType(name, isEnable, isPrivate);
    }

    @Test
    public void getName() {
        assertEquals("DP", this.activityType.getName());
    }

    @Test
    public void getIsEnable() {
        assertEquals(true, this.activityType.isEnable());
    }

    @Test
    public void getIsPrivate() {
        assertEquals(false, this.activityType.isPrivate());
    }

}
