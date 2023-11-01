################################################
## modified from:  
## https://www.r-bloggers.com/2021/05/
## retrieving-stock-price-using-r/
###############################################

library(tidyverse)
library(quantmod)

sdate <- as.Date("2018-07-01")
edate <- as.Date("2019-12-31")

stocks <- list(
  c(code = "005930.KS", name = "Samsung Electronics"),
  c(code = "035420.KS", name = "Naver")
)

#sdate <- as.Date("2023-01-01")
#edate <- as.Date("2023-11-01")

## found a few from
## https://stockanalysis.com/stocks/
stocks <- list(
  c(code ="AAPL", name = "Apple Inc."),
  c(code = "ABNB", name = "Airbnb, Inc."),
  c(code = "CAT", name = "Caterpillar Inc.")
)


## helper-function to
## get get info for one stock:
get_stock <- function(stock) {
  ss_stock <- 
    getSymbols(
      stock["code"],
      from = sdate,
      to = edate,
      auto.assign = FALSE
    )
  ## get the price time series:
  df <- fortify(ss_stock[, 6])
  names(df) <- c("date", "price")
  df$name <- rep(stock["name"], times = nrow(df))
  df
}

## get all stock info into one data frame:
all_stocks <- map_dfr(stocks, get_stock)
