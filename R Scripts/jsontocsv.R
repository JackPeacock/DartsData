## Set working directory
setwd("~/Documents/Darts Business/JSON Data/Premier League/Week 15/lewisanderson/")
## Set the names of the players. Files should be in the form anderson.json, vangerwen.json, etc.
## To create the json files run JSON.stringify(arrayA) and JSON.stringify(arrayB) in chrome console
## The output will need manually copying and pasting into a new .json file
playerA = "lewis"
playerB = "anderson"
library(rjson)
AJSON <- fromJSON(file=paste(playerA, ".json", sep = ""))
BJSON <- fromJSON(file=paste(playerB, ".json", sep = ""))

createDataFrame <- function(JSONList) {
        bed <- vector(); dartScore <- vector(); aimedat <- vector()
        leg <- vector(); sB4Dart <- vector(); sAfDart <- vector()
        number <- vector(); average <- vector()
        
        for (n in 1:length(JSONList)) {
                bed <- c(bed, JSONList[[n]][[1]])
                dartScore <- c(dartScore, JSONList[[n]][[2]])
                aimedat <- c(aimedat, JSONList[[n]][[3]])
                leg <- c(leg, JSONList[[n]][[5]])
                sB4Dart <- c(sB4Dart, JSONList[[n]][[6]])
                sAfDart <- c(sAfDart, JSONList[[n]][[7]])
                number <- c(number, JSONList[[n]][[8]])
                average <- c(average, JSONList[[n]][[9]])
        }
        
        return(data.frame(number, leg, dartScore, bed, aimedat, sB4Dart, sAfDart, average))
}

write.csv(createDataFrame(AJSON), file=paste(playerA, ".csv", sep=""), row.names=FALSE)
write.csv(createDataFrame(BJSON), file=paste(playerB, ".csv", sep=""), row.names=FALSE)