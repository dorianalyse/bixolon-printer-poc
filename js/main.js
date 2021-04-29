var printerPort = "PRINTERPORT1";

function getVersion() {
	
	var Version = null;
	try {
		Version = b2bapis.serialprint.getVersion();
		
	} catch (e) {
		console.log(
				"[getVersion] call syncFunction exception [" +
				e.code +
				"] name: " +
				e.name +
				" message: " +
				e.message
				);
	}
	
	if (null !== Version) {
		console.log("[getVersion] call syncFunction type: " + Version);
	}
}


function openPort(){
	
	var option = null; 
	
	option = {
			baudRate: 9600, 
			parity: "NONE",
            dataBits: "BITS8",
            stopBits: "1",
	};
	
	var result = false; 
	
	function onlistener(printSerialData) {
		console.log("Print serial data is " + printSerialData.data +", Print serial Port is === " + printSerialData.result);
	};
	
	try {
		result = b2bapis.serialprint.open(printerPort, option, onlistener);
		if (result === true) {
			console.log("Printer port opened successfully");
		}
		else {
			console.log("Error opening printer port");
		}
	} catch(e) {
		console.log("[open] call sysFunction exception" + e.code + " " + e.errorName + " " + e.errorMessage);
	}
}

function printText() {
	var result = false; 
	var receiptData = makeReceipt();
	
	var data = stringToHex(receiptData)
	
	try { 
		result = b2bapis.serialprint.writeData(printerPort, data, data.length);
		console.log("[writeData_0] writeData size is " + result);

		
	} catch (e) {
		console.log("[writeData] call syncFunction exception " +
				e.name +
				" " +
				e.message
			
			);
	}
}

function closePort() {
	var result = false; 
	try {
		result = b2bapis.serialprint.close(printerPort);
		if (result === false) {
			console.log("Error closing port");
		}
	} catch (e) {
		console.log("[close] call syncFunction exception " +
				e.code +
				" " +
				e.errorName +
				" " +
				e.errorMessage)
	}
}

function stringToHex(tmp) {
    var str = '';
    var tmp_len = tmp.length;
    var c;

    for (var i = 0; i < tmp_len; i += 1) {
        c = (tmp.charCodeAt(i)).toString(16);
        c == "a" ? c = "0A" : null;
        str += c.toString(16);

        i == tmp_len - 1 ? str += "1B69" : null;
    }
    return str;
}


function numberSpaces(number) {
    var total = ((Number(number).toFixed(2)).toString()).split('.')
    if (total[0].length == 1) {
        total[0] = "   " + total[0]
    } else if (total[0].length == 2) {
        total[0] = "  " + total[0]
    } else if (total[0].length == 3) {
        total[0] = " " + total[0]
    }
    total = total[0] + "." + total[1]
    return total
}

function center(str)
{	
	var numspace = (42 - str.length) / 2;

    var emptySpace = "";
    for (i = 0; i < numspace; i++){
        emptySpace += " ";
    }
    var output = emptySpace + str + emptySpace;
    return output;
}

function left(str) {
	var numspace = (42 - str.length);
	
	var emptySpace = "";
	for(i = 0; i < numspace; i++) {
		emptySpace += " ";
	}
	
	var output = emptySpace + str;
	
	return output;
	
}

function split(str, str2) {
	var numspace = 42 - str.length - str2.length;
	
	var emptySpace = "";
	for(i = 0; i < numspace; i++) {
		emptySpace += " ";
	}
	
	var output = str + emptySpace + str2;
	
	return output;
}
function makeReceipt(){
	
    var d = new Date();


    var companyName = $(".company_name").val()
    var phrase = $(".phrase").val()
    var phone = $(".phone").val()
    var restName = $(".rest_name").val()
    var address1 = $(".company_address_line1").val()
    var address2 = $(".company_address_line2").val()
    
    var payment = $(".payment-type").val()
    var cardnumber = $(".card-number").val()
    var cardentry = $(".entry-type").val()
    var cardtype = $(".card-type").val()
    var customername = $(".customer-name").val()

    var ordermode = $(".order-mode").val()
    var token = $(".order-token").val()

    var subtotalOrder = numberSpaces($(".subtotal").val())
    var taxOrder = numberSpaces($(".tax").val())
	var totalOrder = numberSpaces($(".total").val())
    var footer = $(".footer").val()

    var receiptData =
    "                                          \n" +
    center("--CUSTOMER COPY--") + "\n" +
    center(restName) + "\n\n" +
    "******************************************\n" +
    "                                  \n" +
    center(address1) + "\n" +
    center(address2) + "\n" +
    center(phone) + "\n" +
    center(phrase) + "\n" +
    "                                          \n" +
    "                                          \n" +
    "                                          \n" +
    split("Customer Name:", customername) + "\n" +
    split("Order Token:", token) + "\n" +
    split("Date:", d.toLocaleString("en-US")) + "\n" +
    split("Invoice No:", " #e6d598ef") + "\n" +
    split("Payment Type:", payment.toUpperCase()) + "\n" +
    split("Order Type:", ordermode) + "\n" +

    "                                          \n" +
    "                 PURCHASE                 \n" +
    "                                          \n" +
    "QTY      ITEM              EACH      TOTAL\n" +
    "******************************************\n" +
    "1        Salad             $6.99     $6.99\n" +

    "                                          \n" +
    "                                          \n" +
    "******************************************\n" +

    "Subtotal..........................$" + subtotalOrder.toString() + "\n" +
    "Tax...............................$" + taxOrder.toString() + "\n" +
    "Total.............................$" + totalOrder.toString() + "\n" +
    "                                          \n" +
    "                                          \n" +
    "          Thanks for supporting           \n" +
    "             local business!              \n" +
    "                                          \n" +
    center(footer) + "\n" +
    "                                          \n" +
    "                                          \n" +
    "                                          \n" +
    "                                          \n" +
    "                                          \n" +
    "                                          \n" +
    "                                          \n" +
    "                                          \n";
    return receiptData
}