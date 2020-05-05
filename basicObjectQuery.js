// Written by Frank Korf and Jessica Feliciano
/* When pulling data from the Google Analytics Reporting API, 
you must first write report requests to the API so that it can 
generate the data trees that you will "grab" wanted data from. 

This returns the data trees (can only create a max of five)
to the declared variable rawResult.

It needs the following dependencies to create the data tree(s):
- view ID
- date range

In this script, I've assigned these inputs to the following variables: 
- viewId
- dates (this includes a start and end date)

Note the date format the API accepts: 
      'startDate' : '2019-01-01', 
      'endDate' : '2019-01-31'
      
Here is an example of the dates variable declared:
    var dates =  [{
      'startDate' : '2019-01-01', 
      'endDate' : '2019-01-31'
    }];
    
One final note:
If you declare a 'segmentId,' for one report, 
you must declare the same 'segmentId' for each subsequent report. 
If you don't, you will be thrown an error, 
and the data trees won't generate
    

*/

function getAnalyticsReport( viewId, dates) {
  
  var queryObject = {

    'reportRequests': [

// Report [0] - This report pulls sessions, conversions and conversion rate data for all users 

      {
        'viewId': viewId , // view ID - i.e: 149271239
        'dateRanges': dates, // start and end dates (see above example) 
        'metrics': [
          { 'expression': 'ga:sessions' }, // metric[0] this pulls session data
          { 'expression': 'ga:goalCompletionsAll' }, // metric[1] this pulls completions data
          { 'expression': 'ga:goalConversionRateAll' }, // metric[2] this pulls conversion rate data
          
        ],
          'dimensions': [
          { 'name': 'ga:segment' }, // dimension[0] this pulls all user data
          
        ],
        'segments': [
          { 'segmentId' : 'gaid::-1' }, // this segment pulls all user data
        ]
      }
        ]
      };
      
 var rawResult = AnalyticsReporting.Reports.batchGet( queryObject );
      
 return rawResult; // returns the variable the data tree(s) are assigned to 
      
}      
      
         
