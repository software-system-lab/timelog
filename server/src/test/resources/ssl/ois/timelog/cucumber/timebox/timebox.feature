Feature: operation on timebox

    Scenario: Create a timebox
        Given [timebox] I log in to Timelog with user ID "12345678-90ab-cdef-1234-567812341234"
         When I create a timebox with the title "sprint1" and start date "2020/07/06" due date "2020/07/13"
         Then "sprint1" has been created with the start date "2020/07/06" due date "2020/07/13"