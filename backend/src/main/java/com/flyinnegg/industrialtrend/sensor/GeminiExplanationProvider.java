package com.flyinnegg.industrialtrend.sensor;

import com.google.genai.Client;
import com.google.genai.errors.ApiException;
import com.google.genai.errors.GenAiIOException;
import com.google.genai.gaos.models.interactions.CreateModelInteraction;
import com.google.genai.gaos.models.interactions.Interaction;
import com.google.genai.gaos.models.interactions.InteractionsInput;
import com.google.genai.gaos.models.interactions.Model;
import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
import com.google.genai.types.HttpOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
@ConditionalOnProperty(name = "llm.mode", havingValue = "live")
public class GeminiExplanationProvider implements ExplanationProvider, AutoCloseable {

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
            String text = client.interactions
                    .create(CreateInteractionRequestBody.of(params))
                    .interaction()
                    .flatMap(Interaction::outputText)
                    .orElse("");
            if (text.isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Gemini returned no text");
            }
            return text;
        } catch (ApiException | GenAiIOException error) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Gemini request failed");
        }
    }

    @Override
    public void close() {
        client.close();
    }
}