

const getUrlImage =(coverPath)=>{
    var urlImage = `https://static.esplay.io/movie/cover/original/${coverPath}`;
    return urlImage;
}

const getOverview = async (overview)=>{

    var overV1 = await overview?overview.replace("<p>",""):"";
    var overV2 = await overview?overV1.replace("</p>\n",""):"";
    return overV2;

    
}

const getGenres=async(arrayGenres)=>{
    if(!arrayGenres)return arrayGenres;
    let aux = await arrayGenres.map(d=>d.slug);
    return aux;
}


module.exports ={
    getUrlImage,
    getOverview,
    getGenres
}