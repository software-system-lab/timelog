Feature: operation on activity type

    Scenario: Add an activity type
        Given [Activity] I log in to Timelog with user ID "12345678-90ab-cdef-1234-567812341234"
          And I have "Design Pattern" course in this semester
         When I add it to my activity type list
         Then "Design Pattern" is in my activity type list

    Scenario: Add duplicate activity type
        Given [Activity] I log in to Timelog with user ID "12345678-90ab-cdef-1234-567812341234"
          And I have already had "Design Pattern" in my activity type list
         When I add an activity type with same name
         Then Timelog should reject this command

    Scenario: Remove an activity type
        Given [Activity] I log in to Timelog with user ID "12345678-90ab-cdef-1234-567812341234"
          And I have already had "Design Pattern" in my activity type list
         When I remove it from my activity type list
         Then "Design Pattern" is not in my activity type list

    Scenario: Edit the activity's name, enable, private
        Given [Activity] I log in to Timelog with user ID "12345678-90ab-cdef-1234-567812341234"
          And I have already had "OIS" in my activity type list
         When I change the activity name to "OISv2" and set its state to disabled and private
         Then The activity type "OIS" should change its name to "OISv2" and become disabled and private