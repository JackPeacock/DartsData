players <- "van Barneveld"
averages <- 92.79
result <- "Win"

players <- c(players, "van der Voort")
averages <- c(averages, 89.1)
result <- c(result, "Loss")

players <- c(players, "Taylor")
averages <- c(averages, 101.79)
result <- c(result, "Win")

players <- c(players, "D. Webster")
averages <- c(averages, 96.58)
result <- c(result, "Loss")

players <- c(players, "Pipe")
averages <- c(averages, 96.66)
result <- c(result, "Loss")

players <- c(players, "M. Smith")
averages <- c(averages, 98.87)
result <- c(result, "Win")

players <- c(players, "Newton")
averages <- c(averages, 81.99)
result <- c(result, "Win")

players <- c(players, "Baxter")
averages <- c(averages, 81.62)
result <- c(result, "Loss")

players <- c(players, "Hamilton")
averages <- c(averages, 94.42)
result <- c(result, "Win")

players <- c(players, "Jones")
averages <- c(averages, 82.45)
result <- c(result, "Loss")

players <- c(players, "Thorton")
averages <- c(averages, 97.06)
result <- c(result, "Loss")

players <- c(players, "Nicholson")
averages <- c(averages, 94.95)
result <- c(result, "Win")

players <- c(players, "Dolan")
averages <- c(averages, 88.91)
result <- c(result, "Loss")

players <- c(players, "Burnett")
averages <- c(averages, 93.85)
result <- c(result, "Win")

players <- c(players, "Chisnall")
averages <- c(averages, 98.96)
result <- c(result, "Win")

players <- c(players, "Winstanley")
averages <- c(averages, 94.43)
result <- c(result, "Loss")

players <- c(players, "Wade")
averages <- c(averages, 93.01)
result <- c(result, "Win")

players <- c(players, "A. Smith")
averages <- c(averages, 89.67)
result <- c(result, "Loss")

players <- c(players, "van Gerwen")
averages <- c(averages, 98.85)
result <- c(result, "Win")

players <- c(players, "Beaton")
averages <- c(averages, 92.77)
result <- c(result, "Loss")

players <- c(players, "Whitlock")
averages <- c(averages, 93.88)
result <- c(result, "Win")

players <- c(players, "Painter")
averages <- c(averages, 90.86)
result <- c(result, "Loss")

players <- c(players, "White")
averages <- c(averages, 101.37)
result <- c(result, "Win")

players <- c(players, "Jenkins")
averages <- c(averages, 91.28)
result <- c(result, "Loss")

result <- factor(result)

df <- data.frame(players, averages, result)
df <- df[with(df, order(-averages)), ]
df$players <- reorder(df$players, -df$averages)
df$result <- factor(df$result, levels(df$result)[c(2,1)])

library(ggplot2)
plot <- ggplot(data=df, aes(x=players, y=averages))
plot <- plot + scale_fill_manual(values = c("#4CC3D9", "#93648D"))
plot <- plot + theme(axis.text.x = element_text(angle = 90, hjust = 1))
plot <- plot + coord_cartesian(ylim = c(60,105))
plot <- plot + ylab("Average")
plot <- plot + theme(axis.title.x = element_blank())
setwd("/Users/JackPeacock/Desktop/Darts\ Business")
png("1stroundaverages.png", height= 512, width=1024)
plot + geom_bar(aes(fill=result), stat="identity")
dev.off()
