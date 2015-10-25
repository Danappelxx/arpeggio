Response = new Mongo.Collection("response");
Response.attachSchema(new SimpleSchema({
    componentId: {
        type: String,
        label: "Component ID"
    },
    data: {
        type: String,
        label: "Response Data"
    }
}));


ChartData = class ChartData {
    constructor(component, responses) {
        this.component = component;
        this.responses = this.proccessResponses(responses);
    }

    proccessResponses(responses) {
        // work through them
        return responses;
    }
}

ResponseProcessor = class ResponseProcessor {
    constructor(formId) {

        var form = Form.findOne(formId);
        var componentIds = form.components;

        // console.log(form);

        var chartDatas = componentIds.map ( (componentId) => {
            var component = Component.findOne({ _id : componentId });
            // console.log(component);
            component.data = (component.data || []).map ( (data) => {
                return JSON.parse(data);
            });
            // console.log(component);
            // console.log(component.data);

            var responses = Response.find({ componentId : componentId }).fetch();
            // console.log(responses);

            return new ChartData(component, responses);
        });

        // console.log(chartDatas);
        this.chartDatas = chartDatas;
    }
}
