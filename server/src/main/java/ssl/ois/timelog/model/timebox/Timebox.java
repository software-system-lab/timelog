package ssl.ois.timelog.model.timebox;

public class Timebox {

    private String title;
    private String startDate;
    private String endDate;

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Timebox(String title, String startDate, String endDate){
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }
}