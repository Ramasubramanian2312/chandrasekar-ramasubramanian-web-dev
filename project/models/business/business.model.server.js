module.exports = function () {

    var mongoose = require("mongoose");
    var BusinessSchema = require("./business.schema.server")();
    var Business = mongoose.model("ProjectBusiness", BusinessSchema);

    var api = {
        createBusiness: createBusiness,
        findBusinessByBusinessId: findBusinessByBusinessId,
        findBusinessById: findBusinessById,
        updateBusiness: updateBusiness,
        deleteBusiness: deleteBusiness
    };
    return api;

    function createBusiness(business) {
        return Business.create(business);
    }

    function findBusinessByBusinessId(businessId) {
        return Business.findOne({businessId: businessId});
    }

    function findBusinessById(businessId) {
        return Business.findById(businessId);
    }

    function updateBusiness(id, business) {
        delete business._id;
        return Business
            .update({_id: id}, {
                $set: business
            });
    }

    function deleteBusiness(id) {
        return Business.remove({_id: id});
    }
}
