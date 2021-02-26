package ssl.ois.timelog.adapter.rest;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthCheck {

    @GetMapping(value = "/")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Timelog server is healthy");
    }

    @GetMapping(value = "/test")
    public String foo() {
        return "get successfully";
    }

    @GetMapping(value = "/logout")
    public String logout(HttpServletRequest request) throws ServletException {
        request.logout();
        return "/";
    }
}
