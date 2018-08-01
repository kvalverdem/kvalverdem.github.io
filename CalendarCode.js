var days=["S", "M", "T", "W", "T", "F", "S"];
var months=["January", "February", "March", "April", "May", "June", "July","August","September","October", "November","December"];
var daysByMonth=[31, 28, 31, 30, 31, 30, 31,31,30,31, 30, 31];
var holidays = ['1,1','11,4','1,5','25,7','2,8','15,8','15,9','12,10','25,12']

//Returns the day of the week for a complete day.
function getDayWeek(day,month,year){
    
    var dt = new Date(month+' '+day+', '+year+' 12:00:00');
    return dt.getDay();    
}

function getBackgroundColor(day,month,year){
    
    var dt = new Date(month+' '+day+', '+year+' 12:00:00');
    if (isHoliday(day,month))
    	return 'orange';
    else if (dt.getDay() == 0 || dt.getDay() == 6)
    	return 'yellow';
    else
    	return 'lightGreen';
}

function getDaysMonth(monthNumber, year){
    if ((monthNumber == 2) && ((year % 4) == 0))
			return 29;
	return daysByMonth[monthNumber-1];
}

function isHoliday(day, month)
{
	for (var i=0;i<holidays.length;i++)
	{
		var dayH = holidays[i].split(',')[0];
		var monthH = holidays[i].split(',')[1];
		if (dayH == day && monthH == month)
			return true;
	}
	return false;
}

function isValidDate(date)
{
	if (new Date(date) == 'Invalid Date')
		return false;
	return true;
}

function generateCalendar()
{
	if (!isValidDate(document.getElementById('startDate').value))
	{
		alert('Invalid Date');
		document.getElementById('startDate').value = '';
		document.getElementById('startDate').focus();
		return false;
	}
	if (!/^\+?(0|[1-9]\d*)$/.test(document.getElementById('numberDays').value))
	{
		alert('Invalid Number of Days');
		document.getElementById('numberDays').value = '';
		document.getElementById('numberDays').focus();
		return false;
	}
	var initialDate = document.getElementById('startDate').value.split('/');
	var idDay = parseInt(initialDate[1]);
	var idMonth = parseInt(initialDate[0]);
	var idYear = parseInt(initialDate[2]);
	var table = document.getElementById('calendarTable');
	table.innerHTML = '';
	var row = table.insertRow();
	//Days Header
	for (var c = 0;c<days.length;c++)
	{
		var cell = row.insertCell();
		cell.innerHTML = days[c];
	}
	
	var nDaysLeft = parseInt(document.getElementById('numberDays').value);
	var IniDay = idDay;
	var IniMonth = idMonth;
	var initialDayIndex = getDayWeek(idDay,months[idMonth-1],idYear);
	var first = true;
	var row = table.insertRow();
	var cell = row.insertCell();
	cell.colSpan = '7';
	cell.innerHTML = months[IniMonth-1] + ' ' + idYear;
	cell.style.textAlign = 'center'; 
    cell.style.verticalAlign = 'middle';
	while (nDaysLeft > 0)
	{
		var row = table.insertRow();
		for (var c = 0;c<7;c++)
		{
			var cell = row.insertCell();
			if (nDaysLeft == 0)
			{
				cell.innerHTML = ' ';
				cell.style.backgroundColor = 'gray';
				continue;
			}
			if (first)
			{
				if (c<initialDayIndex){
					cell.innerHTML = ' ';
					cell.style.backgroundColor = 'gray';
				}
				else{
					cell.innerHTML = IniDay;
					cell.style.backgroundColor = getBackgroundColor(IniDay,IniMonth,idYear);
					IniDay++;
					nDaysLeft--;
					first = false;
				}
			}
			else
			{
				cell.innerHTML = IniDay;
				cell.style.backgroundColor = getBackgroundColor(IniDay,IniMonth,idYear);
				IniDay++;
				nDaysLeft--;
			}
			if ((getDaysMonth(IniMonth,idYear)+1) == IniDay)
			{
				IniDay = 1;
				if (nDaysLeft > 0){
					var left = 6-c;
					for (var n = 0;n<left;n++)
					{
						var cell = row.insertCell();
						cell.innerHTML = ' ';
						cell.style.backgroundColor = 'gray';
					}
					

					first = true;
					IniMonth++;
					var row = table.insertRow();
					var cell = row.insertCell();
					cell.colSpan = '7';
					cell.innerHTML = '       ';



					if (IniMonth > 12)
					{	
						IniMonth = 1;
						idYear++;
					}
					var row = table.insertRow();
					var cell = row.insertCell();
					cell.colSpan = '7';
					cell.innerHTML = months[IniMonth-1] + ' ' + idYear;
					cell.style.textAlign = 'center'; 
    				cell.style.verticalAlign = 'middle';
					initialDayIndex = getDayWeek(IniDay,months[IniMonth-1],idYear);
					break;
				}
			}
		}
	}
}
