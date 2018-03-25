import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;


export type ArticleModel = mongoose.Document & {
    id:string,
    _creator:any,
    title:string,
    time: Date,
    content:string,
    meta: {
        look: number,
        favs: number,
        comments: number,
    }
}


var articleSchema = new Schema({
    id: { type: String, unique: true },
    _creator: { type: String, ref: 'User' },
    title: String,
    time: Date,
    content: String,
    meta: {
        look: Number,
        favs: Number,
        comments: Number,
    }
});
articleSchema.pre('save',function(next){
    let self = this;
    if(!self.id){
      self.id = self._id.toString();
    }
    next();
})
var Article = mongoose.model('Article', articleSchema);
export default Article;