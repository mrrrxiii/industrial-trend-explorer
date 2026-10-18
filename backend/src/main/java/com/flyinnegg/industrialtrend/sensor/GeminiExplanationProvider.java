package com.flyinnegg.industrialtrend.sensor;

import java.util.List;
import java.util.stream.Collectors;

import com.google.genai.Client;
import com.google.genai.errors.ApiException;
import com.google.genai.errors.GenAiIOException;
import com.google.genai.gaos.models.interactions.CreateModelInteraction;
import com.google.genai.gaos.models.interactions.Interaction;
import com.google.genai.gaos.models.interactions.InteractionStatus;
import com.google.genai.gaos.models.interactions.InteractionsInput;
import com.google.genai.gaos.models.interactions.Model;
import com.google.genai.gaos.models.interactions.ModelOutputStep;
import com.google.genai.gaos.models.interactions.Step;
import com.google.genai.gaos.models.interactions.TextContent;
import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
import com.google.genai.types.HttpOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
@ConditionalOnProperty(name = "llm.mode", havingValue = "live")
public class GeminiExplanationProvider implements ExplanationProvider, AutoCloseable {

    private static final Logger logger = LoggerFactory.getLogger(GeminiExplanationProvider.class);

    private final Client client;
    private final String model;

    public GeminiExplanationProvider(
            @Value("${GOOGLE_API_KEY:}") String apiKey,
            @Value("${GEMINI_MODEL:}") String model) {
        if (apiKey.isBlank()) {
            throw new IllegalStateException("GOOGLE_API_KEY is required when LLM_MODE=live");
        }
        if (model.isBlank()) {
            throw new IllegalStateException("GEMINI_MODEL is required when LLM_MODE=live");
        }
        this.model = model;
        this.client = Client.builder()
                .apiKey(apiKey)
                .httpOptions(HttpOptions.builder().timeout(30_000).build())
                .build();
    }

    @Override
    public String mode() {
        return "LIVE";
    }

    @Override
    public String generate(TrendResponse trend, String prompt) {
        CreateModelInteraction params = CreateModelInteraction.builder()
                .model(Model.of(model))
                .input(InteractionsInput.of(prompt))
                .build();

        try {
            Interaction interaction = client.interactions
                    .create(CreateInteractionRequestBody.of(params))
                    .interaction()
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.BAD_GATEWAY, "Gemini returned no interaction"));
            String text = extractOutputText(interaction);
            if (text.isBlank()) {
                String status = interaction.status()
                        .map(InteractionStatus::value)
                        .orElse("unknown");
                List<String> stepTypes = interaction.steps()
                        .orElseGet(List::of)
                        .stream()
                        .map(Step::getClass)
                        .map(Class::getSimpleName)
                        .toList();
                logger.warn("Gemini returned no text for model {} (status={}, step types={})",
                        model, status, stepTypes);
                throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Gemini returned no text");
            }
            return text;
        } catch (ApiException error) {
            logger.warn("Gemini API request failed with HTTP status {} ({})", error.code(), error.status());
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Gemini request failed");
        } catch (GenAiIOException error) {
            logger.warn("Gemini request failed due to I/O error ({})", error.getClass().getSimpleName());
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Gemini request failed");
        }
    }

    static String extractOutputText(Interaction interaction) {
        String directText = interaction.outputText().orElse("");
        if (!directText.isBlank()) {
            return directText;
        }

        return interaction.steps()
                .stream()
                .flatMap(List::stream)
                .filter(ModelOutputStep.class::isInstance)
                .map(ModelOutputStep.class::cast)
                .flatMap(step -> step.content().stream().flatMap(List::stream))
                .filter(TextContent.class::isInstance)
                .map(TextContent.class::cast)
                .flatMap(content -> content.text().stream())
                .collect(Collectors.joining());
    }

    @Override
    public void close() {
        client.close();
    }
}