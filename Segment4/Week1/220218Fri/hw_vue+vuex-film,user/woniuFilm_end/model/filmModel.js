let dbUtil=require("../util/dbUtil");
let dbSequence=dbUtil.dbSequence;
let dbFilm=require("../entity/film");

class FilmModel{
    async queryFilm(){
        return await dbFilm.find({});
    }
    async addFilm(film){
        let sequence=await  dbSequence.findOneAndUpdate({_id:"fid"},{$inc:{sequenceValue:1}});
        film._id=sequence.sequenceValue;
        return await dbFilm.insertMany([film]);
    }
    async deleteFilm(_id){
        return await dbFilm.deleteMany({_id});
    }
    async updateFilm(film){
        return await dbFilm.updateMany({_id:parseInt(film._id)},
            {$set:{
                    filmName:film.filmName,
                    filmPrice:parseFloat(film.filmPrice),
                    filmImg:film.filmImg,
                    filmScore:parseFloat(film.filmScore),
                    filmType:film.filmType
                }},
            {multi:true});
    }
}
module.exports=FilmModel;