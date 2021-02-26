Feature: operation on log

    Scenario: Add a log
        Given [Log] I log in to Timelog with user ID "12345678-90ab-cdef-1234-567812341234"
          And I "read design pattern" from "2020/04/10 10:00" to "2020/04/10 12:00", the description is "I learned Composite Pattern."
         When I add a log with activity type "Others" to Timelog
         Then The log should be stored in the Timelog
          And The log has title "read design pattern"
          And The log has start time with "2020/04/10 10:00"
          And The log has end time with "2020/04/10 12:00"
          And The log has description "I learned Composite Pattern."
          And The log has activity type "Others"

    Scenario: Remove a log
        Given [Log] I log in to Timelog with user ID "12345678-90ab-cdef-1234-567812341234"
          And I have added a log with title "read design pattern" and start time "2020/04/10 10:00" and end time "2020/04/10 12:00" and description "composite pattern" and activity type "Others" before
         When I remove the log from my log history
         Then The log should be removed from my log history