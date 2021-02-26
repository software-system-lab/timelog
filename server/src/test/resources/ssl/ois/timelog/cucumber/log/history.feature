Feature: History of logs.
    Background: I logged in to timelog with three logs record before.
      Given [History] I log in to Timelog with user ID "12345678-90ab-cdef-1234-567812341234"
        And [History] There is the first log with title "Read design pattern" and start time "2020/06/19 10:00" and end time "2020/06/19 11:00" and description "composite pattern" and activity type "POSD" in my log history.
        And [History] There is the second log with title "Study clean architecture" and start time "2020/06/20 11:00" and end time "2020/06/20 12:00" and description "dependency rule" and activity type "SA"
        And [History] There is the third log with title "Study DDD" and start time "2020/06/21 13:00" and end time "2020/06/21 14:00" and description "Aggregate" and activity type "SA"

    Scenario: I want to get my log history.
        When [History] I request for the history between "2020/06/20" and "2020/06/21"
        Then [History] I should get a list of logs with size of 2
         And [History] it should contain a log with title "Study clean architecture" and activity type "SA" and start time "2020/06/20 11:00" and end time "2020/06/20 12:00"
         And [History] it should contain a log with title "Study DDD" and activity type "SA" and start time "2020/06/21 13:00" and end time "2020/06/21 14:00"

    Scenario: I want to show my log with selected activity.
        When [History] I request for the history between "2020/06/19" and "2020/06/21" with activity type "POSD" selected
        Then [History] I should get a list of logs with size of 1
         And [History] it should contain a log with and start time "2020/06/19 10:00" and end time "2020/06/19 11:00" and activity type "POSD" in my log dashboard.
