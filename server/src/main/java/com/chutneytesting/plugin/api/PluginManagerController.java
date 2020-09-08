package com.chutneytesting.plugin.api;

import java.util.Collections;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/ui/plugins/v1")
public class PluginManagerController {

    @GetMapping(path = "/{name}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public PluginDefinitionDTO getDefinition(@PathVariable("name") String name) {
        return new PluginDefinitionDTO("<h4>XRay<h4>");
    }

    @GetMapping(path = "/page/{page}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<PluginDefinitionDTO> getDefinitions(@PathVariable("page") String page,
                                                    @RequestParam("section") String section) {
        return Collections.singletonList(new PluginDefinitionDTO("<h4>XRay<h4>"));
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<PluginDTO> listPlugins() {
        return Collections.emptyList();
    }

}

