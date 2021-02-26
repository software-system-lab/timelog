package ssl.ois.timelog.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class SqlDateTimeConverter {
    private static final String DATE_FORMAT = "yyyy-MM-dd HH:mm";

    private SqlDateTimeConverter() {
        throw new IllegalStateException("Utility class");
    }

    public static String toString(Date date) {
        return (new SimpleDateFormat(DATE_FORMAT)).format(date);
    }

    public static Date toDate(String dateString) throws ParseException {
        return (new SimpleDateFormat(DATE_FORMAT)).parse(dateString);
    }
}
