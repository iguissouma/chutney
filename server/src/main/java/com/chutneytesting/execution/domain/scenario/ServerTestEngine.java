package com.chutneytesting.execution.domain.scenario;

import com.chutneytesting.execution.domain.ExecutionRequest;
import com.chutneytesting.execution.domain.report.StepExecutionReportCore;
import io.reactivex.Observable;
import org.apache.commons.lang3.tuple.Pair;

public interface ServerTestEngine {

    StepExecutionReportCore execute(ExecutionRequest executionRequest);

    Pair<Observable<StepExecutionReportCore>, Long> executeAndFollow(ExecutionRequest executionRequest);

    void stop(Long executionHash);

    void pause(Long executionHash);

    void resume(Long executionHash);
}
