const {FeatureListService,LegalDetailsService}=require("../services/FeaturesServices");


exports.FeatureList=async(req,res)=>{
    let result=await FeatureListService();
    return res.status(200).json(result)
}

exports.LegalDetails=async(req,res)=>{
    let result=await LegalDetailsService(req);
    return res.status(200).json(result)
}