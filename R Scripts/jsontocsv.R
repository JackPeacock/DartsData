## Set working directory
setwd("~/Documents/Darts Business/Premier League/week12/andersonvangerwen/")
## Set the names of the players. Files should be in the form anderson.json, vangerwen.json, etc.
## To create the json files run JSON.stringify(arrayA) and JSON.stringify(arrayB) in chrome console
## The output will need manually copying and pasting into a new .json file
playerA = "anderson"
playerB = "vangerwen"
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
                leg <- c(leg, JSONList[[n]][[4]])
                sB4Dart <- c(sB4Dart, JSONList[[n]][[5]])
                sAfDart <- c(sAfDart, JSONList[[n]][[6]])
                number <- c(number, JSONList[[n]][[7]])
                average <- c(average, JSONList[[n]][[8]])
        }
        
        return(data.frame(number, leg, dartScore, bed, aimedat, sB4Dart, sAfDart, average))
}

write.csv(createDataFrame(AJSON), file=paste(playerA, ".csv", sep=""), row.names=FALSE)
write.csv(createDataFrame(BJSON), file=paste(playerB, ".csv", sep=""), row.names=FALSE)