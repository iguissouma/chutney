package com.chutneytesting.engine.api.glacio.parse.default_;

import com.github.fridujo.glacio.model.Step;
import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ParsingTools {

    private ParsingTools() {}

    static Step removeKeyword(Pattern pattern, Step step) {
        Matcher matcher = pattern.matcher(step.getText());
        if (matcher.matches()) {
            String keyword = matcher.group("keyword");
            return new Step(step.isBackground(), step.getKeyword(), step.getText().substring(keyword.length()).trim(), step.getArgument(), step.getSubsteps());
        }
        throw new IllegalStateException();
    }

    static String arrayToOrPattern(String... startingWords) {
        return Arrays.stream(startingWords).reduce((s, s2) -> s + "|" + s2).orElse("");
    }
}
