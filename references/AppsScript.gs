function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Health Insurance')
    .addItem('Get Score', 'getScore')
    .addToUi()
}

host_production = 'health-insurance-cross-sell-pr.herokuapp.com'

function apiCall(data, endpoint){
  var url = 'https://' + host_production + endpoint
  var payload = JSON.stringify(data)
  Logger.log(payload)
  var options = {'method': 'POST', 'contentType':'application/json', 'payload':payload};
  var response = UrlFetchApp.fetch(url,options);

  // get response
  var rc = response.getResponseCode();
  var responseText = response.getContentText();

  Logger.log(responseText)

  if (rc !== 200){
    Logger.log('Response (%s) %s', rc, responseText);
    prediction = 'error'
  }
  else{
    prediction = JSON.parse(responseText)
  }

  return (prediction)

}

// sort by the end of prediction
function autoSort(lastRow){
    
    var ss = SpreadsheetApp.getActiveSpreadsheet()
    var current_sheet = ss.getActiveSheet().getSheetName()
    var ws = ss.getSheetByName(current_sheet)
    var range = ws.getRange('A2' + ':' + 'L' + lastRow)
    range.sort({column:12, ascending: false})

}

function getScore(){
  var ss = SpreadsheetApp.getActiveSheet();
  var titleColumns = ss.getRange('A1:K1').getValues()[0];
  var lastRow = ss.getLastRow();

  // get all the values of the spreadsheet
  var data = ss.getRange('A2' + ':' + 'L' + lastRow).getValues();

  // this var is to control the row number to print
  var row_number = 2

  // run over all rows
  for (row in data){
    var json = new Object();

    // run over all columns
    for (var j = 0; j<titleColumns.length; j++){
      json[titleColumns[j]] = data[row][j];
      
    }

    // List of Json to send

    // Object values are written as name : value pairs (name and value separated by a colon)
    // They are similar to dictionaries in Python

    var json_send = new Object();
    json_send['id'] = json['id']
    json_send['Gender'] = json['Gender']
    json_send['Age'] = json['Age']
    json_send['Driving_License'] = json['Driving_License']
    json_send['Region_Code'] = json['Region_Code']
    json_send['Previously_Insured'] = json['Previously_Insured']
    json_send['Vehicle_Age'] = json['Vehicle_Age']
    json_send['Vehicle_Damage'] = json['Vehicle_Damage']
    json_send['Annual_Premium'] = json['Annual_Premium']
    json_send['Policy_Sales_Channel'] = json['Policy_Sales_Channel']
    json_send['Vintage'] = json['Vintage']

    pred = apiCall(json_send, '/healthinsurance/predict');

    // send back to google sheets
    ss.getRange(row_number, 12).setValue(pred[0]['Score']) 
    row_number++



  }
  // call 
  autoSort(lastRow)


}


