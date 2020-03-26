var csv;
var countries;
var categories;

var processData=function(data) {
  csv = $.csv.toObjects(data);
	
	
  
  $('#datatable').bootstrapTable({
      pagination: true,
      search: true,
      toggle: "table",
      pagination: true,
      toolbar: "#toolbar-table",
      showExport: true,
      exportDataType: "all",
      showToggle: true,
      showColumns: true,
      showFullscreen: true,
      showFooter: true,
      columns: [{
        field: 'organization',
        title: 'Organization',
        width: '20',
        widthUnit: '%',
        sortable: true,
        formatter: linkAccount,
	footerFormatter: TotalLabelFormater
      }, {
        field: 'category',
        title: 'Category',
        width: '20',
        widthUnit: '%',
        sortable: true,
	footerFormatter: TotalFormater
      }, {
        field: 'country',
        title: 'Country',
        width: '10',
        widthUnit: '%',
        sortable: true
      }, {
        field: 'description',
        title: 'Description',
        cardVisible: true,
        width: '40',
        widthUnit: '%',
        visible: true
      }, {
        field: 'url2',
	title: 'Additional link',
        width: '10',
        widthUnit: '%',
        title: 'url'
      }],
      data: csv
  });
  
  countries = [];
  categories = [];
  $.each(csv, function(i,d) { 
  	//console.log(d);
	if(! countries.includes(d.country)) {
	  countries.push(d.country);
	  $("#country")
   		.append('<option val="' + d.country + '">'+ d.country + '</option>');
	}
	if(! categories.includes(d.category)) {
	  categories.push(d.category);
	  $("#category")
   		.append('<option val="' + d.category + '">'+ d.category + '</option>');
	}
  });
	
	$("#country").selectpicker('refresh');
	$("#category").selectpicker('refresh');
	
	$( "#country" ).change(function() {
		refreshFilter();
	});

	$( "#category" ).change(function() {
	 	refreshFilter();
	});
};

var refreshFilter = function() {
	console.log($("#country").val());
	console.log($("#category").val());
	var country = $("#country").val();
	var category = $("#category").val();
	filters = {};
	filters = (country != 0 ? filters : filters["country"] = country);
	filters = (category != 0 ? filters : filters["category"] = category);
	$('#datatable').bootstrapTable('filterBy', filters);
};

var linkAccount = function (value, row, index) {
	return [
		'<a href="http://',
		row.url,
		'" title="Open webpage of ',
		row.organization,
		' in antoher window." target="_blank">',
		value,
		'</a>'].join('');
};

var TotalLabelFormater = function(data) {
    return 'Total';
};

var TotalFormater = function(data) {
    return data.length;
 };

$(document).ready(function() {
  $.ajax({
        type: "GET",
        url: "data/sample.csv",
        dataType: "text",
        success: function(data) {
          processData(data);
        }
     });
});
