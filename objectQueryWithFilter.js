// Code written by Frank Korf and Jessica Feliciano
// Guide written by Jessica Feliciano

/* Building upon the basicObjectQuery.js file, 
this script shows how to create a data tree that 
filters data for you from within the data tree itself.

Please note, this query is dependent on the data you need 
pulled, but this should be sufficient to apply to your needs. 

If you have any trouble creating your own object queries that
includes a filter, please reach out to me with your questions: 

jessfeliciano87[at]gmail.com
*/

function getAnalyticsReport( viewId, dates) {
  
  var queryObject = {

    'reportRequests': [

 // Report [0] - This report will pull in event totals for all users    
       {
          'viewId': viewId ,
          'dateRanges': dates,
          'metrics': [
          { 'expression': 'ga:uniqueEvents' }, // metric[0] this pulls unique event metric data
            ], 
        'dimensions': [
          { 'name': 'ga:segment' }, // dimension[0] this dimension pulls all user data
          { 'name': 'ga:eventCategory' }, // dimension[1] this dimension pulls in event category data
          { 'name': 'ga:eventAction' }, // dimension[2] this dimension pulls in event action data
        ],
      'filtersExpression': 'ga:eventAction==Lead Sent', // this filter includes only event data where the event action equals "Lead Sent"

   /* Note: 
      Everyone names data differently and for Dealer Inspire, 
      a common event action name we use is "Lead Sent," 
      so this filter suites our specific needs. 
      
      Always take into consideration how you specifically setup
      and name your events. 
      
      If you don't have a basic knowledge of navigating Googe Analytics data, 
      I would suggest seeking assistance from data analysts on your team or
      viewing tutorials online. 
      
      Knowledge of how Google Analytics organizes and shows data is
      critical to creating aggregate reports or you run the risk of
      not completing your project or pulling incorrect data. 
      
    */
     
        'segments': [
          { 'segmentId' : 'gaid::-1' }, // this segment pulls in all user data
        ]    
          },
          
 // Report [1] - This report will pull in event totals for all users    
       {
          'viewId': viewId ,
          'dateRanges': dates,
          'metrics': [
          { 'expression': 'ga:pageViews' }, // metric[0] this pulls page view data
            ],              
      'dimensions': [
          { 'name': 'ga:segment' }, // dimension[0] this pulls all user data       
          { 'name': 'ga:deviceCategory' }, // dimension[1] this pulls in device category data (desktop, mobile, tablet)
          { 'name': 'ga:pagePath' }, // dimension[2] this pulls in page path data for our filter
       ],
        'filtersExpression': 'ga:pagePath!@/inventory/;ga:pagePath!@/special-offer/;ga:pagePath!@/?', // applies a filter regarding page paths - do not include page paths containing /inventory/,/special-offer/ and /? 

  /* Note:
  This is an example of a filter that doesn't want data to be 
  included based on specific conditions. 
  
  The ";" is an "and" statement and "!@" means "doesn't contain substring"
  
  There are many reasons why you might want to disinclude information, 
  but the reason why we are filtering this data out is because of 
  the Reporting API's row limits. 
  
  Since the accounts for this type of report has massive amounts of
  page view data with different page paths, the data tree that's created
  shows only partial data because its rows exceed 999, or 1000 since it's 
  zero-summed. 
  
  In the event this occurs, create a filter expression that filters out 
  unwanted data.
  
  If this is confusing and you need additional clarification, please reach 
  out to jessfeliciano87[at]gmail.com.
  
  */

        'segments': [
          { 'segmentId' : 'gaid::-1' }, //all users
        ]
          
      
        ]
      };
      
  
 var rawResult = AnalyticsReporting.Reports.batchGet( queryObject );
      
 return rawResult; // this returns the data tree(s) object as the rawResult variable
      
}



/* Here is a list of metric and dimension filters you can use for your report. 

Metric Filters:
  ==   Equals 
  !=   Does not equal
  >    Greater than
  <    Less than
  >=   Greater than or equal to
  <=   Less than or equal to

Dimension Filters:
  ==   Exact match
  !=   Does not match
  =@   Contains substring
  !@   Does not contain substring
  =~   Contains a match for the regular expression
  !~   Does not match regular expression


Combining Filters with “And” and “Or” Operators:
  And   “ ; ”
  Or    “ , “

