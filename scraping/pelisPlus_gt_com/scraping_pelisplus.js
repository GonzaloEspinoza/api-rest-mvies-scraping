'use strict'
const puppeteer = require('puppeteer');
const fs = require('fs');


async function ScrapingPelisPlus(){
    const Url=`https://v1.pelisplusgt.com/`;

   const Links = await (async()=>{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(Url);
        await page.screenshot({path: 'scraping/pelisplus-com.png'})
        const result = await page.evaluate(()=>{

            const host = 'https://'+document.domain;
            // const url_detail = [...document.querySelectorAll('._1k4zW ._1qhFD li a')].map(d=>d.href);
            var url_detail = [...document.querySelectorAll('._1YnQY li a')].map(d=>d.href);
            document.querySelectorAll('._28O2k._1fxEE')[1].click();

            // await page.goto()

            return url_detail;
        })

        // console.log(result);
        await browser.close();
        return result;
    })();

    // console.log(Links)
   await fs.appendFile('estrenos-home.json', JSON.stringify(Links),'utf8', (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });


    return Links;
}


// __NUXT__
// "uqload.com"
// "mystream.to"
// "kiripiliarload.com"

async function ScrapingMovieDetail(urlDetail){

const linksDetailMovie=['https://v1.pelisplusgt.com/pelicula/i-am-vengeance-retaliation-YbUkz6',
'https://v1.pelisplusgt.com/pelicula/force-of-nature-76UWvd',
'https://v1.pelisplusgt.com/pelicula/athlete-a-4bUYkm',
'https://v1.pelisplusgt.com/pelicula/dads-QEUvRE',
'https://v1.pelisplusgt.com/pelicula/one-way-to-tomorrow-NyU243',
'https://v1.pelisplusgt.com/pelicula/selfie-dad-27Un5L',
'https://v1.pelisplusgt.com/pelicula/lost-bullet-Z1UW62',
'https://v1.pelisplusgt.com/pelicula/feel-the-beat-mzUqyl',
'https://v1.pelisplusgt.com/pelicula/algo-con-una-mujer-okUOA2',
'https://v1.pelisplusgt.com/pelicula/you-should-have-left-p1Up8L',
'https://v1.pelisplusgt.com/pelicula/tainted-rgUnVZ',
'https://v1.pelisplusgt.com/pelicula/2-minutes-of-fame-DdUZPV',
'https://v1.pelisplusgt.com/pelicula/sniper-assassins-end-l1Up4l',
'https://v1.pelisplusgt.com/pelicula/infamous-eOUn7Z',
'https://v1.pelisplusgt.com/pelicula/da-5-bloods-30UmRO',
'https://v1.pelisplusgt.com/pelicula/artemis-fowl-eOUnyY',
'https://v1.pelisplusgt.com/pelicula/think-like-a-dog-LeUv5q',
'https://v1.pelisplusgt.com/pelicula/the-candy-witch-RlUr6D',
'https://v1.pelisplusgt.com/pelicula/the-deeper-you-dig-vaUOLA',
'https://v1.pelisplusgt.com/pelicula/shirley-yAUpjv',
'https://v1.pelisplusgt.com/pelicula/the-last-days-of-american-crime-0nUa65',
'https://v1.pelisplusgt.com/pelicula/babyteeth-MWUOkw',
'https://v1.pelisplusgt.com/pelicula/they-reach-WxU1rR',
'https://v1.pelisplusgt.com/pelicula/la-chancha-bPU8zA',
'https://v1.pelisplusgt.com/pelicula/intuition-EOU427',
'https://v1.pelisplusgt.com/pelicula/im-no-longer-here-VdUmbd',
'https://v1.pelisplusgt.com/pelicula/adventures-of-rufus-the-fantastic-pet-6aU9mn',
'https://v1.pelisplusgt.com/pelicula/inheritance-rgUn53',
'https://v1.pelisplusgt.com/pelicula/banking-on-africa-the-bitcoin-revolution-9NUnOv',
'https://v1.pelisplusgt.com/pelicula/the-lovebirds-ggUe18',
'https://v1.pelisplusgt.com/pelicula/survive-the-night-MWUOjk',
'https://v1.pelisplusgt.com/pelicula/murder-manual-p1UpZA',
'https://v1.pelisplusgt.com/pelicula/ben-platt-live-from-radio-city-music-hall-okUOg4',
'https://v1.pelisplusgt.com/pelicula/adam-strange-27UnrY',
'https://v1.pelisplusgt.com/pelicula/last-moment-of-clarity-BjUWw2',
'https://v1.pelisplusgt.com/pelicula/body-cam-NyU2wm',
'https://v1.pelisplusgt.com/pelicula/the-vast-of-night-0nUaM5',
'https://v1.pelisplusgt.com/pelicula/proximity-QEUvy6',
'https://v1.pelisplusgt.com/pelicula/scoob-PaUoVP',
'https://v1.pelisplusgt.com/pelicula/jesus-d8UbZq',
'https://v1.pelisplusgt.com/pelicula/la-isla-de-las-mentiras-1dU2Pj',
'https://v1.pelisplusgt.com/pelicula/rencor-tatuado-4bUYN6',
'https://v1.pelisplusgt.com/pelicula/the-wrong-missy-zPUYPj',
'https://v1.pelisplusgt.com/pelicula/capone-nOUq0y',
'https://v1.pelisplusgt.com/pelicula/have-a-good-trip-adventures-in-psychedelics-xaTd0l',
'https://v1.pelisplusgt.com/pelicula/the-legion-kvUE5P',
'https://v1.pelisplusgt.com/pelicula/valley-girl-mzUqnv',
'https://v1.pelisplusgt.com/pelicula/devoto-la-invasion-silenciosa-4bUYd6',
'https://v1.pelisplusgt.com/pelicula/becoming-mzUqbv',
'https://v1.pelisplusgt.com/pelicula/you-go-to-my-head-vaUOzO',
'https://v1.pelisplusgt.com/pelicula/dos-caminos-njcqg7',
'https://v1.pelisplusgt.com/pelicula/your-name-XQAIm',
'https://v1.pelisplusgt.com/pelicula/three-billboards-outside-ebbing-missouri-ZNH9o',
'https://v1.pelisplusgt.com/pelicula/blade-runner-2049-l5H8Z',
'https://v1.pelisplusgt.com/pelicula/logan-5VCnM',
'https://v1.pelisplusgt.com/pelicula/lion-O2COB',
'https://v1.pelisplusgt.com/pelicula/contratiempo-AzC2g',
'https://v1.pelisplusgt.com/pelicula/ferrari-race-to-immortality-q3CVb',
'https://v1.pelisplusgt.com/pelicula/bingo-the-king-of-the-mornings-vaUOm3',
'https://v1.pelisplusgt.com/pelicula/tuntematon-sotilas-naHnA',
'https://v1.pelisplusgt.com/pelicula/pengabdi-setan-xVc95',
'https://v1.pelisplusgt.com/pelicula/dunkirk-WpH76',
'https://v1.pelisplusgt.com/pelicula/the-greatest-showman-q3CzQ',
'https://v1.pelisplusgt.com/pelicula/dads-QEUvRE',
'https://v1.pelisplusgt.com/pelicula/one-way-to-tomorrow-NyU243',
'https://v1.pelisplusgt.com/pelicula/selfie-dad-27Un5L',
'https://v1.pelisplusgt.com/pelicula/algo-con-una-mujer-okUOA2',
'https://v1.pelisplusgt.com/pelicula/you-should-have-left-p1Up8L',
'https://v1.pelisplusgt.com/pelicula/tainted-rgUnVZ',
'https://v1.pelisplusgt.com/pelicula/stargate-origins-catherine-9NUnNz',
'https://v1.pelisplusgt.com/pelicula/behind-the-trees-6aU9l3',
'https://v1.pelisplusgt.com/pelicula/7500-VdUmqq',
'https://v1.pelisplusgt.com/pelicula/driven-l1Up0P',
'https://v1.pelisplusgt.com/pelicula/piranhas-8dUZ85',
'https://v1.pelisplusgt.com/pelicula/bulletproof-2-AjUnYl',
'https://v1.pelisplusgt.com/pelicula/the-personal-history-of-david-copperfield-waULoe',
'https://v1.pelisplusgt.com/pelicula/demon-eye-jYUNxW'];




    try {
        
        const url=urlDetail;
        const data = await (async()=>{
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(url);
                await page.screenshot({path: 'scraping/pelisplus-com-detail.png'});

                const result = await page.evaluate(()=>{
                    // var poster_url=document.querySelector('._3iPcB').src;
                    document.querySelector('._1T7h0')?document.querySelector('._1T7h0').remove:'';
                    var poster_url = document.location.origin+document.querySelector('._3iPcB').dataset.src;
                    var poster2_url = document.location.origin + document.querySelector('._17liB').dataset.src;
                    // var title = document.querySelector('._6sykW a').textContent.trim();
                    // var rating = document.querySelector('._6sykW strong').textContent;
                    
                    var data = [...document.querySelectorAll('._25wzV')].map(d=>d.textContent.trim());
                    var duracion = (data[0].split(':'))[1];
                    var estreno = (data[1].split(':'))[1];
                    var genero = (data[2].split(':'))[1];
                    var titulo_original = data[3];
                    var puntuacion = (data[4].split(':'))[1];
                    var audio = (data[6].split(':'))[1];

                    var description = document.querySelector('._3-H4c').textContent;
                    var urlMovies = __NUXT__.data[0].movie.mirrors;

                for (let i = 0; i < urlMovies.length; i++) {
                    urlMovies[i].url = document.location.origin + urlMovies[i].url;
                    //    urlMovies[i]
                }


                    //formacion del objeto
                    const Movie = {
                        title:titulo_original.trim(),
                        runtime:duracion,
                        genere:genero,
                        spoken_languaje:audio,
                        poster_url:poster_url,
                        poster2_url:poster2_url,
                        overview_movie:description,
                        ratings_popularity:puntuacion,
                        release_date:estreno,
                        urls_movie:urlMovies
                    }   

                    return Movie;
                })


                // console.log(result);

                for (let j = 0; j < result.urls_movie.length; j++) {
                    console.log(result.urls_movie[j],'scraping -->ur-valido');
                    console.log(result.title);
                    var urlmoviesVlidos
                    try {
                        
                        await page.goto(result.urls_movie[j].url)
                        urlmoviesVlidos = page.url();
                        console.log('url_movies videos-->',urlmoviesVlidos)
                        
                    } catch (error) {
                        console.log('error ')
                        urlmoviesVlidos = page.url();
                        console.log('url_movies videos-->',urlmoviesVlidos)

                    }

                    result.urls_movie[j].url=urlmoviesVlidos;
                }
                console.log(result)
                await browser.close()
                return result;
            })()

            
            return data;
        } catch (error) {
                
            return {error: 'algo salio mal en la urls..'};
        }
}



module.exports={
    ScrapingPelisPlus,
    ScrapingMovieDetail
}