package ssl.ois.timelog.model.log;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class Log {
    private final UUID id;
    private UUID userID;
    private String title;
    private Date startTime;
    private Date endTime;
    private String description;
    private String activityTypeName;
    private UUID activityUserMapperID;

    public static final String DATE_FORMAT = "yyyy/MM/dd HH:mm";

    public Log(final UUID logID,
               final UUID userID,
               final String title,
               final String startTime,
               final String endTime,
               final String description,
               final String activityTypeName,
               final UUID activityUserMapperID) {
        this.id = logID;
        this.title = title;
        this.userID = userID;
        this.activityTypeName = activityTypeName;
        this.description = description;
        this.activityUserMapperID = activityUserMapperID;
        final SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);
        try {
            this.startTime = dateFormat.parse(startTime);
        } catch (final ParseException e) {
            throw new IllegalArgumentException("Invalid Start Time: " + startTime);
        }
        try {
            this.endTime = dateFormat.parse(endTime);
        } catch (final ParseException e) {
            throw new IllegalArgumentException("Invalid End Time format: " + endTime);
        }
    }

    public Log(final UUID userID,
               final String title,
               final String startTime,
               final String endTime,
               final String description,
               final String activityTypeName,
               final UUID activityUserMapperID) {
        this.id = UUID.randomUUID();
        this.title = title;
        this.userID = userID;
        this.activityTypeName = activityTypeName;
        this.description = description;
        this.activityUserMapperID = activityUserMapperID;
        final SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);
        try {
            this.startTime = dateFormat.parse(startTime);
        } catch (final ParseException e) {
            throw new IllegalArgumentException("Invalid Start Time: " + startTime);
        }
        try {
            this.endTime = dateFormat.parse(endTime);
        } catch (final ParseException e) {
            throw new IllegalArgumentException("Invalid End Time format: " + endTime);
        }
    }

    public int getMinutes() {
        final long time = this.endTime.getTime() - this.startTime.getTime();
        return (int)(time / (60 * 1000));
    }

    public double getHours() {
        final long time = this.endTime.getTime() - this.startTime.getTime();
        return (double)time / (60 * 60 * 1000);
    }

    public UUID getID() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(final String title) {
        this.title = title;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(final Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(final Date endTime) {
        this.endTime = endTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public String getActivityTypeName() {
        return activityTypeName;
    }

    public void setActivityTypeName(final String activityTypeName) {
        this.activityTypeName = activityTypeName;
    }

    public UUID getUserID() {
        return userID;
    }

    public void setUserID(final UUID userID) {
        this.userID = userID;
    }

    public UUID getActivityUserMapperID() {
        return activityUserMapperID;
    }

    public void setActivityUserMapperID(final UUID activityUserMapperID) {
        this.activityUserMapperID = activityUserMapperID;
    }


}
