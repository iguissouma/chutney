package com.chutneytesting;

import com.chutneytesting.design.domain.campaign.CampaignRepository;
import com.chutneytesting.design.domain.dataset.DataSetHistoryRepository;
import com.chutneytesting.design.domain.editionlock.TestCaseEditions;
import com.chutneytesting.design.domain.editionlock.TestCaseEditionsService;
import com.chutneytesting.design.domain.plugins.jira.JiraRepository;
import com.chutneytesting.design.domain.scenario.TestCaseRepository;
import com.chutneytesting.engine.api.execution.TestEngine;
import com.chutneytesting.environment.domain.EnvironmentRepository;
import com.chutneytesting.environment.domain.EnvironmentService;
import com.chutneytesting.execution.domain.campaign.CampaignExecutionEngine;
import com.chutneytesting.execution.domain.compiler.TestCasePreProcessor;
import com.chutneytesting.execution.domain.compiler.TestCasePreProcessors;
import com.chutneytesting.execution.domain.history.ExecutionHistoryRepository;
import com.chutneytesting.execution.domain.jira.JiraXrayPlugin;
import com.chutneytesting.execution.domain.scenario.ScenarioExecutionEngine;
import com.chutneytesting.execution.domain.scenario.ScenarioExecutionEngineAsync;
import com.chutneytesting.execution.domain.scenario.ServerTestEngine;
import com.chutneytesting.execution.domain.state.ExecutionStateRepository;
import com.chutneytesting.execution.infra.execution.ExecutionRequestMapper;
import com.chutneytesting.execution.infra.execution.ServerTestEngineJavaImpl;
import com.chutneytesting.instrument.domain.ChutneyMetrics;
import com.chutneytesting.security.domain.UserService;
import com.chutneytesting.task.api.EmbeddedTaskEngine;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.Clock;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import liquibase.integration.spring.SpringLiquibase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jms.activemq.ActiveMQAutoConfiguration;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = {LiquibaseAutoConfiguration.class, ActiveMQAutoConfiguration.class, MongoAutoConfiguration.class})
@EnableScheduling
@EnableAsync
public class ServerConfiguration {

    private static final Logger LOGGER = LoggerFactory.getLogger(ServerConfiguration.class);

    @Value("${server.port}")
    int port;

    @PostConstruct
    public void logPort() throws UnknownHostException {
        LOGGER.debug("Starting server " + InetAddress.getLocalHost().getCanonicalHostName() + " on " + port);
    }

    @Bean
    public ExecutionConfiguration executionConfiguration(@Value("${chutney.engine.reporter.publisher.ttl:5}") Long reporterTTL) {
        return new ExecutionConfiguration(reporterTTL);
    }

    @Bean
    public SpringLiquibase liquibase(DataSource dataSource) {
        SpringLiquibase liquibase = new SpringLiquibase();
        liquibase.setChangeLog("classpath:changelog/db.changelog-master.xml");
        liquibase.setDataSource(dataSource);
        return liquibase;
    }

    @Bean
    ScenarioExecutionEngine scenarioExecutionEngine(ServerTestEngine executionEngine,
                                                    TestCasePreProcessors testCasePreProcessors,
                                                    ScenarioExecutionEngineAsync executionEngineAsync) {
        return new ScenarioExecutionEngine(
            executionEngine,
            testCasePreProcessors,
            executionEngineAsync);
    }

    @Bean
    ScenarioExecutionEngineAsync scenarioExecutionEngineAsync(ExecutionHistoryRepository executionHistoryRepository,
                                                              ServerTestEngine executionEngine,
                                                              ExecutionStateRepository executionStateRepository,
                                                              ChutneyMetrics metrics,
                                                              TestCasePreProcessors testCasePreProcessors,
                                                              ObjectMapper objectMapper,
                                                              DataSetHistoryRepository dataSetHistoryRepository,
                                                              @Value("${chutney.execution.async.publisher.ttl:5}") long replayerRetention,
                                                              @Value("${chutney.execution.async.publisher.debounce:250}") long debounceMilliSeconds) {
        return new ScenarioExecutionEngineAsync(
            executionHistoryRepository,
            executionEngine,
            executionStateRepository,
            metrics,
            testCasePreProcessors,
            objectMapper,
            dataSetHistoryRepository,
            replayerRetention,
            debounceMilliSeconds);
    }

    @Bean
    TestCasePreProcessors testCasePreProcessors(List<TestCasePreProcessor> processors) {
        return new TestCasePreProcessors(processors);
    }

    @Bean
    CampaignExecutionEngine campaignExecutionEngine(CampaignRepository campaignRepository,
                                                    ScenarioExecutionEngine scenarioExecutionEngine,
                                                    ExecutionHistoryRepository executionHistoryRepository,
                                                    TestCaseRepository testCaseRepository,
                                                    DataSetHistoryRepository dataSetHistoryRepository,
                                                    JiraXrayPlugin jiraXrayPlugin,
                                                    ChutneyMetrics metrics,
                                                    @Value("${chutney.campaigns.thread:20}") Integer threadForCampaigns) {
        return new CampaignExecutionEngine(campaignRepository, scenarioExecutionEngine, executionHistoryRepository, testCaseRepository, dataSetHistoryRepository, jiraXrayPlugin, metrics, threadForCampaigns);
    }

    @Bean
    EnvironmentService environmentService(EnvironmentRepository environmentRepository) {
        return new EnvironmentService(environmentRepository);
    }

    @Bean
    UserService userService() {
        return new UserService();
    }

    @Bean
    TestCaseEditionsService testCaseEditionsService(TestCaseEditions testCaseEditions, TestCaseRepository testCaseRepository) {
        return new TestCaseEditionsService(testCaseEditions, testCaseRepository);
    }

    @Bean
    TestEngine embeddedTestEngine(ExecutionConfiguration executionConfiguration) {
        return executionConfiguration.embeddedTestEngine();
    }

    @Bean
    ServerTestEngine javaTestEngine(TestEngine embeddedTestEngine, ExecutionRequestMapper executionRequestMapper) {
        return new ServerTestEngineJavaImpl(embeddedTestEngine, executionRequestMapper);
    }

    @Bean
    EmbeddedTaskEngine embeddedTaskEngine(ExecutionConfiguration executionConfiguration) {
        return new EmbeddedTaskEngine(executionConfiguration.taskTemplateRegistry());
    }

    @Bean
    JiraXrayPlugin jiraXrayPlugin(JiraRepository jiraRepository, ObjectMapper objectMapper) {
        return new JiraXrayPlugin(jiraRepository, objectMapper);
    }

    @Bean
    Clock clock() {
        return Clock.systemDefaultZone();
    }

}
