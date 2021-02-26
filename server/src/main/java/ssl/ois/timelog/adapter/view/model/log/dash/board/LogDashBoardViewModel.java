package ssl.ois.timelog.adapter.view.model.log.dash.board;

import java.util.HashMap;
import java.util.Map;

public class LogDashBoardViewModel {
    private String totalTime;
    private Map<String, Data> dataMap;

    public LogDashBoardViewModel() {
        this.dataMap = new HashMap<>();
    }

    public String getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(String totalTime) {
        this.totalTime = totalTime;
    }

    public Map<String, Data> getDataMap() {
        return dataMap;
    }

    public void setDataMap(Map<String, Data> dataMap) {
        this.dataMap = dataMap;
    }

    public void add(String activityTypeName, Data data) {
        Data d = this.dataMap.get(activityTypeName);
        if (d == null) {
            this.dataMap.put(activityTypeName, data);
        } else {
            d.setTimeLength(d.getTimeLength() + data.getTimeLength());
            d.setHour(d.getHour() + data.getHour());
            d.setMinute(d.getMinute() + data.getMinute());
        }
    }

    public static class Data {
        private long timeLength;
        private int hour;
        private int minute;

        public long getTimeLength() {
            return timeLength;
        }

        public void setTimeLength(long timeLength) {
            this.timeLength = timeLength;
        }

        public int getHour() {
            return hour;
        }

        public void setHour(int hour) {
            this.hour = hour;
        }

        public int getMinute() {
            return minute;
        }

        public void setMinute(int minute) {
            this.minute = minute;
        }
    }
}
