package com.flyinnegg.industrialtrend.sensor;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class SensorControllerTests {

    private SensorService sensorService;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        sensorService = mock(SensorService.class);
        mockMvc = MockMvcBuilders.standaloneSetup(
                new SensorController(sensorService, mock(ExplanationService.class)))
                .build();
    }

    @Test
    void defaultsTo24HoursWhenTheQueryParameterIsMissing() throws Exception {
        mockMvc.perform(get("/api/sensors/pump-pressure/trend"))
                .andExpect(status().isOk());

        verify(sensorService).getTrend("pump-pressure", 24);
    }

    @Test
    void passesTheSelectedSupportedRangeToTheService() throws Exception {
        mockMvc.perform(get("/api/sensors/pump-pressure/trend").queryParam("hours", "6"))
                .andExpect(status().isOk());

        verify(sensorService).getTrend("pump-pressure", 6);
    }

    @Test
    void returnsBadRequestForAnUnsupportedRange() throws Exception {
        SensorRepository sensorRepository = mock(SensorRepository.class);
        SensorService validatingService = new SensorService(sensorRepository);
        MockMvc validatingMvc = MockMvcBuilders.standaloneSetup(
                new SensorController(validatingService, mock(ExplanationService.class)))
                .build();

        validatingMvc.perform(get("/api/sensors/pump-pressure/trend").queryParam("hours", "2"))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(sensorRepository);
    }
}
