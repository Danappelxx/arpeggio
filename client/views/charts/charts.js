Template.piechart.rendered = function () {
	// var chartDatas = new ResponseProcessor("AAxj8kqqomLJsqqAz").chartDatas;
	var formId = this.find('.piechart').attributes['data-formid'].value;

	Session.set('chartDatas', new ResponseProcessor(formId).chartDatas);
	// console.log(chartDatas);
	var chartDatas = Session.get('chartDatas');
	// get the responses
	// Session.set('chartData', Session.get('chartDatas')[0]);
	console.log('BEGIN');
	var chartData = chartDatas.filter( (chartData) => {
		return chartData.component.graphType == Component.Key.GraphType.pie;
	});
	chartData = chartData[0]; // lol

	var component = chartData.component;
	// Session.set('component', Session.get('chartData').component);

	var choices = component.data;
	var choicesDict = getChoicesDict(choices);
	// Session.set('choices', Session.get('component').data);
	// Session.set('')


	var responses = chartData.responses;
	var answersDict = getAnswersDict(responses);

	var dataMatrix = getDataMatrix(choicesDict, answersDict);
	// Session.set('matrix', dataMatrix);

	// create pie chart
	var piechart = c3.generate({
		bindto: this.find('.piechart'),
		data: {
			columns: dataMatrix, // load in formatted matrix?
			type: 'pie'
		}
	});

	this.autorun(function (tracker) {
		var chartDatas = Session.get('chartDatas');

		var chartData = chartDatas[0];

		var component = chartData.component;
		// Session.set('component', Session.get('chartData').component);

		var choices = component.data;
		var choicesDict = getChoicesDict(choices);
		// Session.set('choices', Session.get('component').data);
		// Session.set('')


		var responses = chartData.responses;
		var answersDict = getAnswersDict(responses);

		var dataMatrix = getDataMatrix(choicesDict, answersDict);


		piechart.load({columns: dataMatrix});
		console.log("aoeu");
  	});

}

// dictionary mapping number value to answer choice string
var getChoicesDict = function (choices) {
	var choicesDict = {

	};
	for (var i = choices.length - 1; i >= 0; i--) {
		choicesDict[choices[i].value] = choices[i].label;
	};

	return choicesDict;
};

// create dictionary with count for each possible response
var getAnswersDict = function (responses) {
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

	return answersDict;
}

// create a matrix to pass in to c3.generate data
var getDataMatrix = function (choicesDict, answersDict) {
	var dataMatrix = [];

	var keys = Object.keys(answersDict);

	for (var i = keys.length - 1; i >= 0; i--) {
		dataMatrix.push([choicesDict[keys[i]], answersDict[keys[i]]]);
	};

	return dataMatrix;
}
