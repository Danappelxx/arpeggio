Template.piechart.rendered = function () {
	
	var chartDatas = new ResponseProcessor("AAxj8kqqomLJsqqAz").chartDatas;
	console.log(chartDatas);

	// get the responses 
	var chartData = chartDatas[0];

	var component = chartData.component;
	var choices = component.data;
	
	// dictionary mapping number value to answer choice string
	var choicesDict = {

	};
	for (var i = choices.length - 1; i >= 0; i--) {
		choicesDict[choices[i].value] = choices[i].label;
	};

	var responses = chartData.responses;

	// create dictionary with count for each possible response
	var answersDict = {
		// "0": 1,
		// "5": 1,
		// "10": 2
	};

	for (var i = responses.length - 1; i >= 0; i--) {
		var data = responses[i].data;
		if(answersDict[data] == undefined) {
			answersDict[data] = 0;
		}
		answersDict[responses[i].data]++;
	};

	// create a matrix to pass in to c3.generate data
	var columnMatrix = [];

	var keys = Object.keys(answersDict);

	for (var i = keys.length - 1; i >= 0; i--) {
		columnMatrix.push([choicesDict[keys[i]], answersDict[keys[i]]]);
	};

	// create pie chart
	var piechart = c3.generate({
		bindto: this.find('.piechart'),
		data: {
			columns: columnMatrix, // load in formatted matrix?
			type: 'pie'
		}
	});

	// this.autorun(function (tracker) {
	// 	piechart.load({columns: [
 //      		Session.get('x'),
 //      		Session.get('data1'),
 //      		Session.get('data2'),
 //      		[]
 //    	]});
 //  	});

}