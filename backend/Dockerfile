FROM eclipse-temurin:25-jdk-noble AS build

WORKDIR /workspace

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN ./mvnw --batch-mode dependency:go-offline

COPY src/ src/
RUN ./mvnw --batch-mode package -DskipTests

FROM eclipse-temurin:25-jre-noble

WORKDIR /app

RUN groupadd --system app \
    && useradd --system --gid app --home-dir /app --shell /usr/sbin/nologin app

COPY --from=build --chown=app:app /workspace/target/industrial-trend-api-*.jar app.jar

USER app
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
