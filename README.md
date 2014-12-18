BBC Voice
=========

BBC Voice is an application that lets users explore BBC content quickly and easily through voice commands

## Technical Architecture

+ Front End UI
+ BBC Unity API (bringing together messy BBC API content into simple unified JSON response format)
  - Locator
  - News (Trevor)
  - Travel
  - Sport
  - Weather
+ Speech inference engine

URL Mappings
================

## NEWS

> BBC show me business news

```
/news
/news/:subject
```

## WEATHER

> BBC show me the weather in London on Friday

```
/weather -> show me the weather
/weather/:location -> show me the weather in cardiff
/weather/:location/:time -> show me the weather in london on friday
```

## TRAVEL

> BBC tell me about traffic in London

```
/travel (most urgent traffic info) -> show me traffic information
/travel/:motorway -> show me traffic on the M4
/travel/:location -> show me traffic in London
/travel/:location/:mode -> are there tube delays in London today?
```

## SPORT

> BBC show me Cardiff City fixtures

```
/sport
```

> BBC who won the Grand Prix on Sunday

### Sport results

```
/sport/results/:team -> show me Cardiff City results
/sport/results/:team/:date -> show me sports results for QPR this weekend
```

### Sport fixtures

> BBC when is the next england game

```
/sport/fixtures/:team
/sport/fixtures/:team/:date
/sport/fixtures/:league -> what are the premier league fixtures?
/sport/fixtures/:league/:date -> show me 5 nations fixtures
```

### Sport tables

> BBC Rugby Union

```
/sport/table/championship -> BBC: champions league
```

## Going forward

Suggestions for potential products that could be integrated

> BBC play radio 1 for me

+ BBC Radio

