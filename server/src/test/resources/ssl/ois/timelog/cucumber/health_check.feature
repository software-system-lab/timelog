Feature: HealthCheck

    Scenario: Perform health check.
        When I perform get request to "/api/" path
        Then I get status 200 and message "Timelog server is healthy" as response.
