package ssl.ois.timelog.model.activity.type;

import java.util.UUID;

public class ActivityType {
    private final UUID id;
    private String name;
    private boolean isEnable;
    private boolean isPrivate;

    public ActivityType(UUID activity_id, String name, Boolean isEnable, Boolean isPrivate) {
        this.id = activity_id;
        this.name = name;
        this.isEnable = isEnable;
        this.isPrivate = isPrivate;
    }

    public ActivityType(String name, Boolean isEnable, Boolean isPrivate) {
        this.id = UUID.randomUUID();
        this.name = name;
        this.isEnable = isEnable;
        this.isPrivate = isPrivate;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isEnable() {
        return isEnable;
    }

    public void setEnable(boolean enable) {
        isEnable = enable;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }

}
