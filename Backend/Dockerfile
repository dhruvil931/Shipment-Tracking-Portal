FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy only necessary files first (better caching)
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Give permission
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy source
COPY src src

# Build jar
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8080

# Run app
CMD ["java", "-jar", "target/Backend-0.0.1-SNAPSHOT.jar"]