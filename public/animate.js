export function Animate(count, values, times) {
  // Find the current segment in times array
  let segment = 0;
  while (segment < times.length && count > times[segment]) {
    segment++;
  }

  // If count exceeds the last time point, stay at the last value
  if (segment >= times.length) {
    return(values[values.length - 1]);
  }

  // Interpolate between values[segment] and values[segment + 1]
  let startTime = times[segment - 1] || 0; // Default to 0 if segment - 1 is undefined
  let endTime = times[segment];
  let startValue = values[segment - 1] || values[0]; // Default to first value if segment - 1 is undefined
  let endValue = values[segment];
  // Calculate the interpolated value
  let interpolatedValue = startValue + (endValue - startValue) * ((count - startTime) / (endTime - startTime));

  // Output the interpolated value
  return(interpolatedValue);
}
