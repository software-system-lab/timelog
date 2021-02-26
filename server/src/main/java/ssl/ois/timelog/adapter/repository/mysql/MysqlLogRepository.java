package ssl.ois.timelog.adapter.repository.mysql;

import org.springframework.beans.factory.annotation.Autowired;
import ssl.ois.timelog.adapter.database.MysqlDriverAdapter;
import ssl.ois.timelog.common.SqlDateTimeConverter;
import ssl.ois.timelog.model.log.Log;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.exception.log.GetLogErrorException;
import ssl.ois.timelog.service.exception.log.SaveLogErrorException;
import ssl.ois.timelog.service.repository.log.LogRepository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class MysqlLogRepository implements LogRepository {
    @Autowired
    private MysqlDriverAdapter mysqlDriverAdapter;

    @Override
    public void addLog(Log log) throws SaveLogErrorException {
        Connection connection = null;
        try {
            connection = this.mysqlDriverAdapter.getConnection();

            try (PreparedStatement stmt = connection.prepareStatement(
                "INSERT INTO `log`" + 
                "(`id`, `user_id`, `title`, `start_time`, `end_time`, `description`, `activity_type`, `activity_user_mapper_id`) " + 
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)")) {
                    
                stmt.setString(1, log.getID().toString());
                stmt.setString(2, log.getUserID().toString());
                stmt.setString(3, log.getTitle());
                stmt.setString(4, SqlDateTimeConverter.toString(log.getStartTime()));
                stmt.setString(5, SqlDateTimeConverter.toString(log.getEndTime()));
                stmt.setString(6, log.getDescription());
                stmt.setString(7, log.getActivityTypeName());
                stmt.setString(8, log.getActivityUserMapperID().toString());

                stmt.executeUpdate();
            }
        } catch (SQLException e) {
            throw new SaveLogErrorException(log.getTitle());
        } finally {
            this.mysqlDriverAdapter.closeConnection(connection);
        }
    }

    @Override
    public void updateLog(Log log, String targetID) throws GetLogErrorException, SaveLogErrorException {
        Connection connection = null;
        try {
            connection = this.mysqlDriverAdapter.getConnection();

            try (PreparedStatement stmt = connection.prepareStatement(
                "UPDATE `log`" + 
                "SET `title`= ?, `start_time`= ?, `end_time`= ?, `activity_type`= ?, `activity_user_mapper_id`= ? " + 
                "WHERE log.id = ? AND log.user_id = ?")) {

                stmt.setString(1, log.getTitle());
                stmt.setString(2, SqlDateTimeConverter.toString(log.getStartTime()));
                stmt.setString(3, SqlDateTimeConverter.toString(log.getEndTime()));
                stmt.setString(4, log.getActivityTypeName());
                stmt.setString(5, log.getActivityUserMapperID().toString());
                stmt.setString(6, targetID);
                stmt.setString(7, log.getUserID().toString());

                stmt.executeUpdate();
            }
        } catch (SQLException e) {
            throw new SaveLogErrorException(log.getTitle());
        } finally {
            this.mysqlDriverAdapter.closeConnection(connection);
        }
    }

    @Override
    public Log findByID(String id) throws GetLogErrorException {
        Connection connection = null;
        Log log = null;
        try {
            connection = this.mysqlDriverAdapter.getConnection();

            try (PreparedStatement stmt = connection.prepareStatement(
                "SELECT `log`.* , `activity`.`user_id` ,  `activity`.`activity_type_name` +" +
                " FROM `log` ,`activity_user_mapper` as `activity`" +
                " WHERE `log`.`id` = ?" +
                " AND `log`.`activity_user_mapper_id` = `activity`.`id`")) {

                stmt.setString(1, id);

                try (ResultSet rs = stmt.executeQuery()) {
                    rs.next();

                    UUID logID = UUID.fromString(rs.getString("id"));
                    String title = rs.getString("title");
                    String startTime = rs.getString("start_time").replace("-","/");
                    String endTime = rs.getString("end_time").replace("-","/");
                    String description = rs.getString("description");
                    UUID activityUserMapperID = UUID.fromString(rs.getString("activity_user_mapper"));
                    UUID userID = UUID.fromString(rs.getString("user_id"));
                    String activityType = rs.getString("activity_type_name");

                    log = new Log(logID, userID, title, startTime, endTime, description, activityType, activityUserMapperID);
                }
            }
        } catch (SQLException e) {
            throw new GetLogErrorException(id);
        } finally {
            this.mysqlDriverAdapter.closeConnection(connection);
        }
        return log;
    }

    @Override
    public Boolean removeByID(String logID) throws GetLogErrorException, SaveLogErrorException {
        Connection connection = null;
        try {
            connection = this.mysqlDriverAdapter.getConnection();

            try (PreparedStatement stmt = connection.prepareStatement("DELETE FROM `log` WHERE `id` = ?")) {
                stmt.setString(1, logID);
                stmt.executeUpdate();
            }
        } catch (SQLException e) {
            return false;
        } finally {
            this.mysqlDriverAdapter.closeConnection(connection);
        }
        return true;
    }

    @Override
    public List<Log> findByPeriod(String userID, String startDate, String endDate) throws DatabaseErrorException {
        Connection connection = null;
        List<Log> logList = new ArrayList<>();
        try {
            connection = this.mysqlDriverAdapter.getConnection();
            
            try (PreparedStatement stmt = connection.prepareStatement(
                "SELECT `log`.* ,`activity`.`user_id`,`activity`.`activity_type_name`" +
                "FROM `log`, `activity_user_mapper` as `activity`" +
                "WHERE `activity`.`user_id` = ? " +
                "AND `log`.`activity_user_mapper_id` = `activity`.`id`" +
                "AND `log`.`start_time` >= ? " +
                "AND `log`.`end_time` < ? ")) {

                stmt.setString(1, userID);
                stmt.setString(2, startDate);
                stmt.setString(3, endDate);
                try (ResultSet rs = stmt.executeQuery()) {
                    while (rs.next()) {
                        UUID logID = UUID.fromString(rs.getString("id"));
                        String title = rs.getString("title");
                        String startTime = rs.getString("start_time").replace("-","/");
                        String endTime = rs.getString("end_time").replace("-","/");
                        String description = rs.getString("description");
                        UUID activityUserMapperID = UUID.fromString(rs.getString("activity_user_mapper_id"));
                        UUID uid = UUID.fromString(rs.getString("user_id"));
                        String activityType = rs.getString("activity_type_name");
                        Log log = new Log(logID, uid, title, startTime,
                                endTime, description, activityType,activityUserMapperID);
                        logList.add(log);
                    }
                }
            }

        } catch (SQLException e) {
            throw new DatabaseErrorException();
        } finally {
            this.mysqlDriverAdapter.closeConnection(connection);
        }
        return logList;
    }

    @Override
    public UUID findActivityUserMapperID(String userID, String activityTypeName) throws DatabaseErrorException {
        Connection connection = null;
        UUID activityUserMapperID;
        try {
            connection = this.mysqlDriverAdapter.getConnection();

            try (PreparedStatement stmt = connection.prepareStatement(
                "SELECT `id` FROM `activity_user_mapper` WHERE `user_id` = ? " +
                "AND `activity_type_name` = ?")) {

                stmt.setString(1, userID);
                stmt.setString(2, activityTypeName);
                try (ResultSet rs = stmt.executeQuery()) {
                    rs.next();
                    activityUserMapperID = UUID.fromString(rs.getString("id"));
                }
            }
        } catch (SQLException e) {
            throw new DatabaseErrorException();
        } finally {
            this.mysqlDriverAdapter.closeConnection(connection);
        }            
        return activityUserMapperID;
    }
}
