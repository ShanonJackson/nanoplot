## Decisions

# Categorical Axes
- String values = Always categorical (values can't exist between two strings)
- {type: "categorical"} forces categorical which always spaces evenly; This is useful for Bar charts, where
  you want 
- 



# Temporal Axes
- from: "auto" to: "auto", jumps: "auto" with like 15 temporal x values (say 1per month, for 1.25 years of time)
Result should be: floor(min(x values), auto duration) -> ceil(max(x values), auto duration)
Line should be plotted from LEFT wall of graph -> Right wall of graph
Jumps > 15 means we should pick them a duration, jumps <= 11 means we should take their intervals.