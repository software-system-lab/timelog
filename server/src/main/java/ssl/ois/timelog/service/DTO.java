package ssl.ois.timelog.service;

public abstract class DTO {
    private String id;

    public DTO(String id) {
        this.id = id;
    }

    public String getID() {
        return this.id;
    }
}