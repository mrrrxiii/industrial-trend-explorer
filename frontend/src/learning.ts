const readings = [
  { timestamp: '2026-10-01T00:00:00Z', value: 68 },
  { timestamp: '2026-10-01T00:30:00Z', value: 86 },
  { timestamp: '2026-10-01T01:00:00Z', value: 72 },
]

const displayLabels = readings.map(
  (reading) => `${reading.timestamp}: ${reading.value}`,
)

const readingsAbove80 = readings.filter((reading) => reading.value > 80)

function average(values: number[]): number {
  return values.reduce((total, value) => total + value, 0) / values.length
}

const changedReading = { ...readings[0], value: 69 }

export function runLearningExamples(): void {
  console.log('Original readings:', readings)
  console.log('Display labels:', displayLabels)
  console.log('Readings above 80:', readingsAbove80)
  console.log(
    'Average value:',
    average(readings.map((reading) => reading.value)),
  )
  console.log('Original first reading:', readings[0])
  console.log('Changed copy:', changedReading)
}
