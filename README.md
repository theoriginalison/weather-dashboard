# weather-dashboard
Week 6 Homework

[LINK TO PAGE](https://theoriginalison.github.io/weather-dashboard/)

index.html
![Screenshot of Weather Dashboard with stored cities](./assets/weather-dashboard-screenshot.png)

## Approach & Process

- I began by building the HTML and CSS, by examining the sample image. I determined the number of rows and columns, and since the side bar created one large row, I learned how to create rows in columns (which needed to happen for <main>).
- I created relevant classes and IDs to group elements together or tag them, depending on their functionality and style: elements that would need a similar style received a class, and otherwise, elements that would have an item appended received an ID.
- I ran into some trouble with creating the 5 Day Forecast, but discovered card-deck as a Bootstrap component.
- For functionality, I created a div where a button would be created for every searched city, and had a dummy button waiting there so I could nail the aesthetics first.
- This was a JQuery BEAST, but was also honestly fun. I began wrapping my head around the JS by first looking at the Open Weather API offerings, and looking for what I needed (which turned out to be only two different APIs).
- I created an API key and realized that I need information from the first API to call the second API (the longitude and latitude were needed for the One Call API).
- Everything starts with the click function on the search bar, so I started there. This would have be saved in local storage, enter the queryURL, and become a button underneath the search (that would be clickable to recall it again).
- Local storage happened first, then creating the queryURL and ajax to complete the HTTP API call.
- I also knew that I needed to getItem, to make sure the buttons remained even when the page was refreshed.
- I console.logged all API calls so I could easily access the object and find its components.
- Once I had the initial object, I could start calling the information needed to have the current weather. That included converting the temperature to Farenheight and creating a URL for the image based on an icon key.
- Parts of the object used were appended or modified in the html.
- Then, it was time for the One Call API, since I had the longitude and latitude from the initial query.
- I created an other HTTP request to return the UV Index.
- Seeing that UVI could be labelled as favorable, moderate, or severe, I thought the easiest way to color-code would be to create CSS clases that could be added or removed based on the conditions of the number. 
- Time for the five day forecast-- once I realized that this was an array, it became easier to work.
- I needed to convert the UNIX time associated with each day to a comprehensible date, first.
- Then, I could repeat a lot of the original html changes and appending, but with the object components I needed. 
- I created one template, then once that was working, did that four more times. I realize how much easier this would be with a for loop.
- THEN...the onClick event needed to be applied to the appended previously searched city buttons. I figured I could copy and paste the code, making sure I changed the capturing of the value of the search bar to the text on the button (and using "this" to select the button that was clicked).

## Discoveries
- Bootstrap Card Deck! It's a beautiful way to create a series of cards that have spacing between them.
- If I can't get an element to do what I want, I can be creative. The sidebar was floating and the margins were problematic, so I created a background that was a lighter grey that all objects floated in. 
- Any time I found myself repeating myself, I realized that there was a simpler way to do things. I've been focusing on "get it to work first" and then I could make it more elegant. 

## Further features for next time
- A "clear" function for the saved cities, or ability to make favorites (indicated with the classic little yellow star)
- A background that changes according to the current weather of the location; this could be done with a realistic image or with the enlarged icon as the background (or faded and repeated like tiles, or wallpaper)
- Suggested activities depending on the weather-- this is a big reach, but could be cool if linked to a site like TripAdvisor