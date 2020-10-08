package com.chutneytesting.task.micrometer;

import static io.micrometer.core.instrument.Metrics.globalRegistry;
import static java.lang.Double.parseDouble;
import static java.util.Objects.requireNonNull;
import static java.util.Optional.ofNullable;

import com.chutneytesting.task.spi.Task;
import com.chutneytesting.task.spi.TaskExecutionResult;
import com.chutneytesting.task.spi.injectable.Input;
import com.chutneytesting.task.spi.injectable.Logger;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MicrometerCounterTask implements Task {

    protected static final String OUTPUT_COUNTER = "micrometerCounter";

    private final Logger logger;
    private final String name;
    private final String description;
    private final String unit;
    private final List<String> tags;
    private Counter counter;
    private final double increment;

    public MicrometerCounterTask(Logger logger,
                                 @Input("name") String name,
                                 @Input("description") String description,
                                 @Input("unit") String unit,
                                 @Input("tags") List<String> tags,
                                 @Input("counter") Counter counter,
                                 @Input("registry") MeterRegistry registry,
                                 @Input("increment") String increment) {
        this.logger = logger;
        this.name = name;
        this.description = description;
        this.unit = unit;
        this.tags = tags;
        this.increment = parseDouble(ofNullable(increment).orElse("-1.0"));
        this.counter = ofNullable(counter).orElseGet(() -> this.retrieveCounter(registry));
    }

    @Override
    public TaskExecutionResult execute() {
        try {
            if (increment > 0) {
                counter.increment(increment);
                logger.info("Counter incremented by " + increment);
            }
            logger.info("Counter current count is " + counter.count());
            return TaskExecutionResult.ok(toOutputs());
        } catch (Exception e) {
            logger.error(e);
            return TaskExecutionResult.ko();
        }
    }

    private Counter retrieveCounter(MeterRegistry registry) {
        MeterRegistry registryToUse = ofNullable(registry).orElse(globalRegistry);

        Counter.Builder builder = Counter.builder(requireNonNull(name))
            .description(description)
            .baseUnit(unit);

        ofNullable(tags).ifPresent(t -> builder.tags(t.toArray(new String[0])));

        return builder.register(registryToUse);
    }

    private Map<String, Object> toOutputs() {
        Map<String, Object> outputs = new HashMap<>();
        outputs.put(OUTPUT_COUNTER, counter);
        return outputs;
    }
}
