function retrieveAccountsWithFetchXML() {
    // Define the FetchXML query
    var fetchXml = `
        <fetch top='5' datasource='bin' >
            <entity name='account' >
                <attribute name='fullname' />
                <attribute name='contactid' />
            </entity>
        </fetch>
    `;
    
    // URL-encode the FetchXML
    var encodedFetchXml = encodeURIComponent(fetchXml);
    
    // Construct the Web API URL
    var apiUrl = Xrm.Page.context.getClientUrl() + "/api/data/v9.2/contacts?fetchXml=" + encodedFetchXml;
    
    // Create and configure the XMLHttpRequest
    var req = new XMLHttpRequest();
    req.open("GET", apiUrl, true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    
    // Handle the response
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var response = JSON.parse(this.response);
                var accounts = response.value;
                var result = "Retrieved Accounts:\n";
                for (var i = 0; i < accounts.length; i++) {
                    result += accounts[i].name + " (ID: " + accounts[i].accountid + ")\n";
                }
                alert(result);
            } else {
                alert("Error: " + this.statusText);
            }
        }
    };
    
    // Send the request
    req.send();
}

// Execute the function (e.g., on form load)
retrieveAccountsWithFetchXML();


<fetch datasource="bin">
  <entity name="task">
    <all-attributes />
  </entity>
</fetch>

 function ff() {
  const fetchXml = `<fetch datasource="bin">
  <entity name="task">
    <all-attributes />
  </entity>
</fetch>`;

  const encoded = encodeURIComponent(fetchXml);
  const url = `${clientUrl}/api/data/v9.2/tasks?fetchXml=${encoded}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "OData-MaxVersion": "4.0",
        "OData-Version": "4.0",
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();
    debugger;
    return result.value[0]?.recordcount || 0;

  } catch (error) {
    console.error("FetchXML failed", error);
    return 0;
  }
}