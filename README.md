BBC Voice
=========

BBC Voice is an application that lets users explore BBC content quickly and easily through voice commands

URL Mappings
================

## NEWS

```
/news
/news/:subject
```

## WEATHER

```
/weather -> show me the weather
/weather/:location -> show me the weather in cardiff
/weather/:location/:time -> show me the weather in london on friday
```

## TRAVEL

```
/travel (most urgent traffic info) -> show me traffic information
/travel/:motorway -> show me traffic on the M4
/travel/:location -> show me traffic in London
/travel/:location/:mode -> are there tube delays in London today?
```

## SPORT

"BBC show me sport"
```

/sport
```

"BBC show me Cardiff City fixtures"

```
/sport/fixtures/:team
/sport/fixtures/:team/:date
```

### Sport results

```
/sport/results/:team -> show me Cardiff City results
/sport/results/:team/:date -> show me sports results for QPR this weekend
```

### Sport fixtures

```
/sport/fixtures/:team
/sport/fixtures/:team/:date
/sport/fixtures/:league -> what are the premier league fixtures?
/sport/fixtures/:league/:date -> show me 5 nations fixtures
```

### Sport tables

```
/sport/table/championship -> BBC: champions league
```
