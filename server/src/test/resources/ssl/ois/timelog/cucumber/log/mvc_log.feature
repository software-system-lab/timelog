Feature: user record a time

    Scenario: Record a log
        Given mvc I "read design pattern" from "2020/04/10 10:00" to "2020/04/10 12:00", the description is "I learned Composite Pattern."
          And mvc My user ID is "12345678-90ab-cdef-1234-567812341234"
          And mvc Activity type "Others" is selected
         When mvc I record the activity to Timelog
         Then mvc A new log is added
          And mvc This log has title "read design pattern"
          And mvc This log has start time with "2020/04/10 10:00"
          And mvc This log has end time with "2020/04/10 12:00"
          And mvc This log has description "I learned Composite Pattern."
          And mvc This log has activity type "Others"

