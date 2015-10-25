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
        this.responses = this.proccessResponses();
    }

    proccessResponses() {
        // work through them
        return this.responses
    }
}

ResponseProcessor = class ResponseProcessor {
    constructor(formId) {

        var form = Form.findOne(formId);
        var componentIds = form.components;

        var chartDatas = componentIds.map ( (componentId) => {
            var component = Component.findOne({ _id : Components });
            var responses = Response.find({ componentId : componentId }).fetch();

            return new ChartData(component, responses);
        });

        this.chartDatas = chartDatas;
    }
}
