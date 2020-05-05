// Code written by Frank Korf and Jessica Feliciano
// Guide written by Jessica Feliciano

/* Once you have created your data trees with the desired data, 
you will now need to create your row array of the desired data
in the desired sequence. 

Your row array will then loop through the accounts you'd like data to 
pull from, but this specific loop for the time being is outside of the 
scope of this file since it is meant to instruct in bite sizes. 

As a note, the variable reportdata is a variable that is declared in 
the loop function (not in this file), but since it is a parameter for 
this function, I'm including its definition here for context: 

var reportData = getAnalyticsReport(viewId, dates);

If you have read the basicObjectQuery.js file from this repo, 
getAnalyticsReport() and its parameters should be familiar to you. 
getAnalyticsReport() pings the Google Analytics Reporting API and uses the 
viewId and dates parameters to pull data from the appropriate view ID(s) and
time frame (start and end dates).

The immediate example below shows how you can pull data from the data tree 
(aka construct your row array) by declaring an empty array and using the 
push() method to add data items to your array.

Another method of assigning items to your row array can be seen in example #2.
Instead of using the push method, you instead assign the data to specific
items in your array. This is useful especially when no data is available, 
the row array will still have four items, rather than pushing a row array of 
only three items and throwing off the data columns in the Google Sheet. 

*/

// Example #1

function writeRow( reportData ){
  
  var row = []; // assigns the empty array of "row"
  
  ////// Session Data \\\\\\\\
  
  row.push(reportData.reports[0].data.totals[0].values[0]) // pulls session data from the data tree. 
  
  
  ////// Completions Data \\\\\\\\
  
  row.push(reportData.reports[0].data.totals[0].values[1]) // pulls completions data from the data tree
  
  
  ////// Conversion Rate Data \\\\\\\\
  
  row.push(Number(reportData.reports[0].data.totals[0].values[2])/100) /* pulls the conversion rate, 
                                                                        turns it into a number and divides by 100 so that in the Google Sheet, 
                                                                        I can format the cell as a percent without skewing data */
  
  
  ////// Conversations Lead Events \\\\\\\\ /* Conversations is a chat tool Dealer Inspire developed, 
                                                so this section of script pulls event data pushed from this tool. 
                                                This functionality however can be repurposed for your specific needs 
                                                whether you are pulling event, page view, or other metrics that need to
                                                meet specific conditions */
  
  var conversationsLeadEvents = 0; // assigns a new variable to house the data
  
  if( reportData.reports[1].data.hasOwnProperty( 'rows' ) ) {   // if report[1] generates rows, proceed 
  for (var i =0; i < reportData.reports[1].data.rows.length; i++){ // for report[1], loop through each row and if the dimension data matches the following condition(s), assign data to the variable
    if (reportData.reports[1].data.rows[i].dimensions[0] == 'All Users' && 
        reportData.reports[1].data.rows[i].dimensions[1] == 'Conversations'){
      
      conversationsLeadEvents += Number(reportData.reports[1].data.rows[i].metrics[0].values[0])}
  }  
  row.push(conversationsLeadEvents);
  
  }else { // else, if none of the dimensions fit the condition(s) or no data is available, push "0" to row array
    row.push(0)}  
    
    
    
// Example #2 

function writeRow( reportData ){
  
  var row = new array(4); // creates a new "row" array and specifies the number of items to expect
  
  ////// Session Data \\\\\\\\
  
  row[0] = (reportData.reports[0].data.totals[0].values[0]) // pulls session data from data tree
  
  
  ////// Completions Data \\\\\\\\
  
  row[1] = (reportData.reports[0].data.totals[0].values[1]) // pulls completion data from data tree
  
  
  ////// Conversion Rate Data \\\\\\\\
  
  row[2] = (Number(reportData.reports[0].data.totals[0].values[2])/100) /* pulls the conversion rate, 
                                                                        turns it into a number and divides by 100 so that in the Google Sheet, 
                                                                        I can format the cell as a percent without skewing data */
  
  
  ////// Conversations Lead Events \\\\\\\\
  
  var conversationsLeadEvents = 0;
  
  if( reportData.reports[1].data.hasOwnProperty( 'rows' ) ) { // if report[1] generates rows, proceed 
  for (var i =0; i < reportData.reports[1].data.rows.length; i++){ // for report[1], loop through each row and if the dimension data matches the following condition(s), assign data to the variable
    if (reportData.reports[1].data.rows[i].dimensions[0] == 'All Users' && 
        reportData.reports[1].data.rows[i].dimensions[1] == 'Conversations'){
      conversationsLeadEvents += Number(reportData.reports[1].data.rows[i].metrics[0].values[0])}
  }  
  row[3] = (conversationsLeadEvents);
  }else { // else, if none of the dimensions fit the condition(s) or no data is available, assign "0" to row[3]
    row[3] = (0)}  
    
    


