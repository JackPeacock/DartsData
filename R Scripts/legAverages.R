legAverage <- vector()

for (n in 1:max(df$leg)) {
        legdf <- df[df$leg==n,]
        total = sum(legdf$dartScore)
        legAverage = c(legAverage, total*3/nrow(legdf))
}

plot(1:max(df$leg), legAverage)