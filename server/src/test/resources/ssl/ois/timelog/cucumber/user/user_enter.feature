Feature: user enter Timelog

    Scenario: A user first time enter Timelog
        Given My user ID is "12345678-90ab-cdef-1234-567812341234"
         When I first time enter Timelog
         Then I will get my activity type list that contains "Other" and "LabProject" and "LabDuty"
         And I will get my log list that contains nothing

    Scenario: A user re-enter Timelog
        Given I have entered the Timelog with user ID "12345678-90ab-cdef-1234-567812341234" before
          And There is an activity type "OIS" in my activity type list
          And There is a log with title "read design pattern" and start time "2020/04/10 10:00" and end time "2020/04/10 12:00" and description "composite pattern" and activity type "Others" in my log history
         When I enter the Timelog with same user ID again
         Then I will get my activity type list and log list
          And The activity type list contains "Other" and "OIS" and "LabProject" and "LabDuty"
