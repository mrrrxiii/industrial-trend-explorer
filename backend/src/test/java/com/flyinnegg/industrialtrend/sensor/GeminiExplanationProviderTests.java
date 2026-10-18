package com.flyinnegg.industrialtrend.sensor;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.google.genai.gaos.models.interactions.Interaction;
import com.google.genai.gaos.models.interactions.InteractionStatus;
import com.google.genai.gaos.models.interactions.ModelOutputStep;
import com.google.genai.gaos.models.interactions.TextContent;

class GeminiExplanationProviderTests {

    @Test
    void extractsTextFromModelOutputStepsWhenConvenienceTextIsAbsent() {
        Interaction interaction = Interaction.builder()
                .status(InteractionStatus.COMPLETED)
                .steps(List.of(ModelOutputStep.builder()
                        .content(List.of(TextContent.builder().text("Generated text").build()))
                        .build()))
                .build();

        assertEquals("Generated text", GeminiExplanationProvider.extractOutputText(interaction));
    }

    @Test
    void prefersConvenienceTextOverStepContent() {
        Interaction interaction = Interaction.builder()
                .status(InteractionStatus.COMPLETED)
                .outputText("Convenience text")
                .steps(List.of(ModelOutputStep.builder()
                        .content(List.of(TextContent.builder().text("Step content").build()))
                        .build()))
                .build();

        assertEquals("Convenience text", GeminiExplanationProvider.extractOutputText(interaction));
    }
}
