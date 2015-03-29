players <- "Anderson"
averages <- 99.59

players <- c(players, "Wade")
averages <- c(averages, 94.13)

players <- c(players, "van Gerwen")
averages <- c(averages, 97.78)

players <- c(players, "Newton")
averages <- c(averages, 84.67)

players <- c(players, "Whitlock")
averages <- c(averages, 93.69)

players <- c(players, "Taylor")
averages <- c(averages, 103.98)

players <- c(players, "Lewis")
averages <- c(averages, 102.94)

players <- c(players, "Chisnall")
averages <- c(averages, 96.63)

df <- data.frame(players, averages)
df$players <- reorder(df$players, -df$averages)
df <- df[with(df, order(-averages)), ]
alternate <- factor(c(1,2,1,2,1,2,1,2))
df <- cbind(df, alternate)

library(ggplot2)
plot <- ggplot(data=df, aes(x=players, y=averages))
plot <- plot + scale_fill_manual(values = c("#5B6187", "#474D70"))
plot <- plot + theme(axis.text.x = element_text(angle = 90, hjust = 1), axis.title.x = element_blank())
plot <- plot + coord_cartesian(ylim = c(60,105))
plot <- plot + guides(fill=FALSE)
plot <- plot + ylab("Average")
setwd("/Users/JackPeacock/Desktop/Darts\ Business/Graphics")
png("2ndroundaverages.png", height= 512, width=1024)
plot + geom_bar(aes(fill=alternate), stat="identity")
dev.off()