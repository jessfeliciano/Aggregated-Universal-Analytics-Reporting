// Code created by Frank Korf
// Guide/file created by Jessica Feliciano

/*

This modal functionality works in conjunction with a few
custom functions since we use this modal to gather the 
start and end dates from the user so that we can generate
the data trees using the object queries. 

When the user presses our custom menu item (script for this is in 
the GoogleSheetCustomMenu.js file) called "Reporting" > "Main Report," 
a modal pops up and asks for start and end dates. 

When inputting dates into the modal, the user must provide them in 
the following formats: 
  - MM/DD/YYYY
  - M/D/YYYY
  
If the user doesn't input a four digit year, the program 
will not recognize the time frame and the report will fail. 

Once the modal has collected and reformatted the start and
end dates in a way the Google Analytics Reporting API requires, 
showPrompt() then runs the runDataPull() function. This is a custom 
script we use at Dealer Inspire to run the report from start to finish
(i.e. ping the Reporting API, generate the data tree(s), write the 
row array that you'd like to push to the Google Sheet and print 
the data to the desired tab).

*/



function showPrompt( ){
    var ui = SpreadsheetApp.getUi();
    
    var dateResult, confirmResult, dateObj, startDate, endDate;
    
    var title = '';
    
    do {
      dateResult = ui.prompt(
        'Enter a start date', // Prompt to enter start date for user
        ui.ButtonSet.OK_CANCEL // Ok button for user to click when ready
        );
     dateObj = new Date(dateResult.getResponseText());
      confirmResult = ui.alert('Is this date correct?', dateObj.toDateString() , ui.ButtonSet.YES_NO);
    } while( confirmResult !== ui.Button.YES ); // User confirms the date she/he input into textfield
    
    startDate = getDateString( dateObj );
    title += getTitleDateString( dateObj );
    title += ' to ';
    
    do {
      dateResult = ui.prompt(
        'Enter a end date',
        ui.ButtonSet.OK_CANCEL
        );
     dateObj = new Date(dateResult.getResponseText());
      confirmResult = ui.alert('Is this date correct?', dateObj.toDateString() , ui.ButtonSet.YES_NO);
    } while( confirmResult !== ui.Button.YES );
    
    endDate = getDateString( dateObj );
    title += getTitleDateString( dateObj );

    
    var dates =  [{
      'startDate' : startDate, 
      'endDate' : endDate
    }];
    
    runDataPull( dates ); // Custom function that runs our report for us
    
    SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName('MASTER') // Name of the tab (sheet) that we print the date range to
    .getRange(1, 1) // We print the date range to row 1, column 1
    .setValue( title ); // We denote the time frame here as title 
    
  }
  
function getDateString( date ) { 
/* This functions takes in the date object given by the user and returns it in the following format: yyyy-mm-dd

The Google Analytics Reporting API requires the date ranges be given in the above format

*/

  // take in date object
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [date.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
  // return yyyy-mm-dd
}
  
  
  function getTitleDateString( date ) {
      // take in date object
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd,
          date.getFullYear()
         ].join('/');
  // return mm-dd-yyyy
  }
  
