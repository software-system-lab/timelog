FROM maven:3.6.3-jdk-11
ADD . /app
WORKDIR /app
RUN ["mvn", "install"]
# Run spring-boot server
CMD ["mvn", "spring-boot:run"]
