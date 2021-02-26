package ssl.ois.timelog.adapter.view.model.log.history;

import java.util.ArrayList;
import java.util.List;

public class LogHistoryViewModel {
    private List<LogItem> logItemList;

    public LogHistoryViewModel() {
        this.logItemList = new ArrayList<>();
    }

    public List<LogItem> getLogItemList() {
        return logItemList;
    }

    public void addItem(LogItem logItem) {
        this.logItemList.add(logItem);
    }

    public static class LogItem {
        private String id;
        private String activityTypeName;
        private String title;
        private String startTime;
        private String endTime;

        public String getID() { return id; }

        public void setID(String id) { this.id = id; }

        public String getActivityTypeName() {
            return activityTypeName;
        }

        public void setActivityTypeName(String activityTypeName) {
            this.activityTypeName = activityTypeName;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
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
    }
}
