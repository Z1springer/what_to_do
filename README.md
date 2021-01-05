# What To Do, Here's A Clue

## Description

What To Do? Here's A Clue! is calendar application that provides suggestions to fill your time. It also shows a motivational quote to get you inspired to do something new. 

- view application: https://z1springer.github.io/what_to_do/
- github repository: https://github.com/Z1springer/what_to_do
-----------------------------------------------------------------------------------------------------------------------------------------------

### Features

 - View calendar by day, week, or month.
 - Add custom categorized events.
 - View and add suggested activities by type. 
 - View and cycle through inspirational quotes.
-----------------------------------------------------------------------------------------------------------------------------------------------

### Known Issues

 - Single day only events supported.
 - Shadows align incorrectly at certain sizes.
-----------------------------------------------------------------------------------------------------------------------------------------------

### Future Plans

 - Add multiple day spanning events.
 - Add no-time events.
 - Add desktop notifications.
 - Add event reminders.
 - Add repeating events.
 - Share events.
-----------------------------------------------------------------------------------------------------------------------------------------------

### Technology Used

- QuoteAPI for the quote box that remains constant at the top of the screen *(https://type.fit/api/quotes)*
- BoredAPI for the random activities *(http://www.boredapi.com)*
- Materialize for the CSS *(https://materializecss.com/)*
- Corkboard Background found at *(https://subtlepatterns.com)*
- JavaScript
- HTML-5
- jQuery
- CSS
- Favicon generation from http://faviconit.com/en 
----------------------------------------------------------------------------------------------------------------------------------------------

### Screenshots
Week View
![Screenshot of week view](./assets/images/screenshot1.png?raw=true "Week View")

Month View
![Screenshot of month view](./assets/images/screenshot2.png?raw=true "Month View")

Day View
![Screenshot of day view](./assets/images/screenshot3.png?raw=true "Day View")

Add Event Form
![Screenshot of add event view](./assets/images/screenshot4.png?raw=true "Event View")

---------------------------------------------------------------------------------------------------------------------------------------------
## Detailed Information

### User Story

```
AS A USER
I WANT to have a scheduler that will help me fill my days with activity
SO THAT I can fill any open time in my schedule for new and exciting activites
```

### User Interactivity

```
WHEN I open the page
<!-- From Week View -->
THEN I presented with the Week View with a nav bar at the top of the screen with four buttons on the right and a Random Quote generated in the top yellow box
WHEN I scroll down
THEN I can see a title card with month name and week number above 7 empty columns with the days of the week and the specific dates for each day respectively
WHEN I click on one of the days of the week under the title card
<!-- To Day View -->
THEN I am taken to the Day View page for the day I clicked on
WHEN I look at the page
THEN I see the quote I generated has remained up at the top within the yellow box
WHEN I scroll down
THEN I see a title card containing the name of the day and the date for that specific day
WHEN I scroll down further
THEN I am presented with an open space under the title card with a time scale descending down the right side of the page
WHEN I click on the Add Event button on the nav bar
<!-- To Event Form -->
THEN I am presented with a blue-themed form for me to make a new event
WHEN I click to select a date for the event
THEN a date selector is projected so that I can just click on a day within any month and recieve the month, day, and year to fill the input
WHEN I click to select a Start Time for the event
THEN a time selector is projected so that I can click on the time I want from the clock presented to me to then fill the input field
WHEN I click to select an End Time for the event
THEN I am presented with the same time selector to choose my desired end time for the event
WHEN I look underneath the time parameters
THEN I see a list of radio buttons to choose which type of activity I want it to be
WHEN I click the ADD EVENT button 
THEN I am shown a red warning that a description for the event is a required field to fill
WHEN I add a description
THEN I can click the ADD EVENT button
<!-- Back to Day View -->
WHEN I click the ADD EVENT button
THEN my activity is added to the Day View beginning at the Start Time specified, and concluding at the End Time specified
WHEN I want to replace an activity with a random event
THEN I click on an event card that was generated already
WHEN I click on the event card
<!-- Back to Event Form -->
THEN I am brought back to the Event Form already filled out with the relevent event data for the desired card
WHEN I select an option from the right-hand side radio button list
THEN I click the GET RANDOM ACTIVITY button
WHEN I click the GET RANDOM ACTIVITY button
THEN the description for the event is changed to a random activity with the suggested number of participants and its category
WHEN I have an updated event
THEN I click the UPDATE EVENT button
WHEN I click the UPDATE EVENT button
<!-- Back to Day View -->
THEN the edited card is again displayed on screen within its specified time parameters and with the updated description
WHEN I want to delete an event
THEN I click on the desired event card I want to delete
WHEN I click on the event card
<!-- Back to Event Form -->
THEN I am brought back to the Event Form
WHEN I am in the Event Form
THEN I can click the DELETE EVENT button
WHEN I click the DELETE EVENT button
<!-- Back to Day View -->
THEN the desired event card is removed from the page
WHEN I want to view the whole month
THEN I click on the Month View button in the nav bar
WHEN I click the Month View button
<!-- To Month View -->
THEN I am brought to the Month View Page
WHEN I look at the page
THEN I see the same quote still in the yellow box at the top of the page
WHEN I scroll down
THEN I am presented with a multi-colored calendar
WHEN I look at this calendar
THEN I see all of the activities that I have made for various days displayed as a multi-colored bar going horizontally along the bottom of each week
WHEN I hover my cursor over an individual box within any day of the calendar
THEN I am presented with a tool tip that shows the description as well as the Start and End times
WHEN I look at each individual day square
THEN I see that each set of activities for each day resembles the time span in the day view but on a much smaller scale
WHEN I want to edit a specific day in the Month View
THEN I click on the individual boxes' number in the top left-hand corner
WHEN I click on that number
<!-- Back to Day View -->
THEN I am taken to the Day View of the specified day
```

