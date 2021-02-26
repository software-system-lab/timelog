package ssl.ois.timelog.adapter.repository.mysql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import ssl.ois.timelog.adapter.database.MysqlDriverAdapter;
import ssl.ois.timelog.model.activity.type.ActivityType;
import ssl.ois.timelog.model.user.User;
import ssl.ois.timelog.service.exception.DatabaseErrorException;
import ssl.ois.timelog.service.exception.activity.ActivityTypeNotExistException;
import ssl.ois.timelog.service.exception.activity.DuplicateActivityTypeException;
import ssl.ois.timelog.service.repository.user.UserRepository;

public class MysqlUserRepository implements UserRepository {
    @Autowired
    private MysqlDriverAdapter mysqlDriverAdapter;

    @Override
    public void save(User user) throws DatabaseErrorException, DuplicateActivityTypeException,
            ActivityTypeNotExistException {
        Connection connection = null;
        try {
            connection = this.mysqlDriverAdapter.getConnection();

            try (PreparedStatement stmt = connection.prepareStatement(
                "INSERT IGNORE INTO `user`(`id`) VALUES (?)"
            )) {
                stmt.setString(1, user.getID().toString());

                stmt.executeUpdate();
            }

        } catch (SQLException e) {
            throw new DatabaseErrorException();
        } finally {
            this.mysqlDriverAdapter.closeConnection(connection);
        }
    }

    @Override
    public void addActivityType(User user) throws DatabaseErrorException, DuplicateActivityTypeException{
        Connection connection = null;

        try {
            connection = this.mysqlDriverAdapter.getConnection();

            if(this.isExistInMapper(connection, user.getID().toString(), user.getOperatedActivityType().getName())) {
                if(this.isDeletedInMapper(connection, user.getID().toString(), user.getOperatedActivityType().getName())){
                    this.updateActivityTypeUserMapper(connection, user.getID().toString(), user.getOperatedActivityType());
                }
                else{
                    throw new DuplicateActivityTypeException();
                }
            }
            else {
                this.addActivityType(connection, user.getOperatedActivityType());
                this.addActivityTypeUserMapper(connection, user.getID().toString(), user.getOperatedActivityType());
            }

        } catch (SQLException e) {
            throw new DatabaseErrorException();
        } finally {
            this.mysqlDriverAdapter.closeConnection(connection);
        }
    }

    @Override
    public void editActivityType(User user) throws DatabaseErrorException, DuplicateActivityTypeException, ActivityTypeNotExistException {
        Connection connection = null;
        try {
            connection = this.mysqlDriverAdapter.getConnection();

            if(!this.isExistInMapper(connection, user.getID().toString(), user.getTargetActivityTypeName())) {
                throw new ActivityTypeNotExistException(user.getOperatedActivityType().getName());
            }
            if(this.isExistInMapper(connection, user.getID().toString(), user.getOperatedActivityType().getName()) &&
                    !user.getOperatedActivityType().getName().equals(user.getTargetActivityTypeName())) {
                throw new DuplicateActivityTypeException();
            }
            this.addActivityType(connection, user.getOperatedActivityType());
            this.updateActivityTypeUserMapper(connection, user.getID().toString(), user.getOperatedActivityType());

        } catch (SQLException e) {
            throw new DatabaseErrorException();
        } finally {
            this.mysqlDriverAdapter.closeConnection(connection);
        }
    }

    @Override
    public void removeActivityType(User user) throws DatabaseErrorException, ActivityTypeNotExistException {
        Connection connection = null;
        try {
            connection = this.mysqlDriverAdapter.getConnection();

            if(!this.isExistInMapper(connection, user.getID().toString(), user.getTargetActivityTypeName())) {
                throw new ActivityTypeNotExistException(user.getTargetActivityTypeName());
            }
            this.removeActivityTypeUserMapper(connection, user.getID().toString(), user.getTargetActivityTypeName());

        } catch (SQLException e) {
            throw new DatabaseErrorException();
        } finally {
            this.mysqlDriverAdapter.closeConnection(connection);
        }
    }

    @Override
    public User findByUserID(String userID) throws DatabaseErrorException{
        Connection connection = null;
        User user = null;
        try {
            connection = this.mysqlDriverAdapter.getConnection();

            try (PreparedStatement stmt = connection.prepareStatement(
                "SELECT * FROM `user` WHERE `id` = ?"
            )) {
                stmt.setString(1, userID);

                try (ResultSet rs = stmt.executeQuery()) {
                    if(rs.next()) {
                        user = new User(UUID.fromString(rs.getString("id")), this.getActivityTypeList(connection, userID));
                    }
                }
            }
        } catch (SQLException e) {
            throw new DatabaseErrorException();
        } finally {
            this.mysqlDriverAdapter.closeConnection(connection);
        }
        return user;
    }

    private boolean isExistInMapper(Connection connection, String userID, String activityTypeName) throws SQLException {
        try (PreparedStatement stmt = connection.prepareStatement(
            "SELECT COUNT(*) FROM `activity_user_mapper` " +
            "WHERE activity_user_mapper.user_id = ? " +
            "AND activity_user_mapper.activity_type_name = ?"
        )) {
            stmt.setString(1, userID);
            stmt.setString(2, activityTypeName);

            try (ResultSet rs = stmt.executeQuery()) {
                rs.next();

                return rs.getInt(1) == 1;
            } catch (SQLException e) {
                throw e;
            } 
        }
    }

    private boolean isDeletedInMapper(Connection connection, String userID, String activityTypeName) throws SQLException {
        try (PreparedStatement stmt = connection.prepareStatement(
            "SELECT COUNT(*) FROM `activity_user_mapper` " +
            "WHERE activity_user_mapper.user_id = ? " +
            "AND activity_user_mapper.activity_type_name = ?" +
            "AND activity_user_mapper.is_deleted = ?"
        )) {
            stmt.setString(1, userID);
            stmt.setString(2, activityTypeName);
            stmt.setInt(3, 1);

            try (ResultSet rs = stmt.executeQuery()) {
                rs.next();
                return rs.getInt(1) == 1;
            } catch (SQLException e) {
                throw e;
            } 
        }
    }

    private List<ActivityType> getActivityTypeList(Connection connection, String userID) throws SQLException {
        List<ActivityType> activityTypeList = new ArrayList<>();

        try (PreparedStatement stmt = connection.prepareStatement(
                "SELECT * FROM `activity_user_mapper` WHERE activity_user_mapper.user_id = ?" +
                " AND activity_user_mapper.is_deleted = 0 "
            )) {
                stmt.setString(1, userID);

                try (ResultSet rs = stmt.executeQuery()) {
                    while(rs.next()) {
                        UUID id = UUID.fromString(rs.getString("id"));
                        String activityTypeName = rs.getString("activity_type_name");
                        boolean isEnable = rs.getInt("is_enable") == 1;
                        boolean isPrivate = rs.getInt("is_private") == 1;
    
                        ActivityType activityType = new ActivityType(id, activityTypeName, isEnable, isPrivate);

                        activityTypeList.add(activityType);
                    }
                } catch (SQLException e) {
                    throw e;
                } 
            }
        return activityTypeList;
    }

    private void addActivityType(Connection connection, ActivityType activityType) throws SQLException {
        try (PreparedStatement stmt = connection.prepareStatement(
            "INSERT IGNORE INTO `activity_type` (`name`) VALUES (?)"
        )) {
            stmt.setString(1, activityType.getName());

            stmt.executeUpdate();
        } catch (SQLException e) {
            throw e;
        } 
    }

    private void addActivityTypeUserMapper(Connection connection, String userID, ActivityType activityType)
            throws SQLException {
        try (PreparedStatement stmt = connection.prepareStatement(
            "INSERT INTO `activity_user_mapper` " + 
            "(`id`,`activity_type_name`, `user_id`, `is_enable`, `is_private`) " +
            "VALUES (?, ?, ?, ?, ?)"
        )) {
            stmt.setString(1, activityType.getId().toString());
            stmt.setString(2, activityType.getName());
            stmt.setString(3, userID);
            stmt.setInt(4, activityType.isEnable() ? 1 : 0);
            stmt.setInt(5, activityType.isPrivate() ? 1 : 0);

            stmt.executeUpdate();
        } catch (SQLException e) {
            throw e;
        } 
    }

    private void updateActivityTypeUserMapper(Connection connection, String userID, ActivityType activityType)
            throws SQLException {
        try (PreparedStatement stmt = connection.prepareStatement(
            "UPDATE `activity_user_mapper` " + 
            "SET `activity_type_name`= ?, `is_enable`= ?,`is_private`= ?,`is_deleted`= ? " +
            "WHERE activity_user_mapper.id = ?" 
        )) {
            stmt.setString(1, activityType.getName());
            stmt.setInt(2, activityType.isEnable() ? 1 : 0);
            stmt.setInt(3, activityType.isPrivate() ? 1 : 0);
            stmt.setInt(4, 0);
            stmt.setString(5, activityType.getId().toString());

            stmt.executeUpdate();

        } catch (SQLException e) {
            throw e;
        } 
    }

    private void removeActivityTypeUserMapper(Connection connection, String userID, String targetActivityTypeName)
            throws SQLException {
        try(PreparedStatement stmt = connection.prepareStatement(
            "UPDATE `activity_user_mapper` " +
            "SET `is_deleted`= ? " +
            "WHERE activity_user_mapper.user_id = ? " +
            "AND activity_user_mapper.activity_type_name = ?"
        )) {
            stmt.setInt(1, 1);
            stmt.setString(2, userID);
            stmt.setString(3, targetActivityTypeName);

            stmt.executeUpdate();
        } catch (SQLException e) {
            throw e;
        } 
    }


    @Override
    public UUID findActivityUserMapperID(String userID, String activityTypeName) throws DatabaseErrorException {
        Connection connection = null;
        UUID activityUserMapperID = null;
        try {
            connection = this.mysqlDriverAdapter.getConnection();
            if(this.isExistInMapper(connection, userID, activityTypeName)){
                try (PreparedStatement stmt = connection.prepareStatement(
                        "SELECT `id` FROM `activity_user_mapper` WHERE `user_id` = ? AND `activity_type_name` = ?")) {

                    stmt.setString(1, userID);
                    stmt.setString(2, activityTypeName);
                    try (ResultSet rs = stmt.executeQuery()) {
                        rs.next();
                        activityUserMapperID = UUID.fromString(rs.getString("id"));

                    }
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