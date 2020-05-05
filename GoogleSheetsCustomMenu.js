// Pulled from https://developers.google.com/apps-script/guides/menus
// Guide/file created by Jessica Feliciano

/*

This is a very simple, but useful script,
especially if you are creating an automated report
that will be mostly utilized by non-technical teams. 

This function, upon loading the sheet in the browser,
will generate a custom menu item. In the example below, 
the menu is called "Reporting" and the submenu is called "Main Report."

When the user selects "Menu Report," the function showPrompt() will run. 
For the reports that we created at Dealer Inspire, showPrompt()
is a custom script that we created. It prompts a modal form where
the user inputs start and end dates for the software to assign to our 
"dates" variable. 

Since our reports are mostly intended for use by non-technical 
team members, we've created some easy to use UI elements 
that allow them to run the report without making any 
modifications in the report backend. 

*/

function onOpen() {
  var ui = SpreadsheetApp.getUi(); // Assigns variable ui to the UI library built into Google App Script
  ui.createMenu('Reporting') // Name of the custom menu that generates in the Google Sheet
      .addItem('Main Report', 'showPrompt') // Name of the submenu and the function that's prompted when the menu item is selected
      .addToUi();
      
      
