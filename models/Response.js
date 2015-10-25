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
