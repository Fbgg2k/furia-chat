// backend/src/services/news.js  

import axios from 'axios';  
import * as cheerio from 'cheerio'; // Modifique a importação para usar * as  

const HLTV_NEWS_URL = 'https://www.hltv.org/news'; // URL da página de notícias  

export async function getNews() {  
  try {  
    const { data } = await axios.get(HLTV_NEWS_URL);  
    const news = [];  

    const $ = cheerio.load(data);  

    // Seleciona os elementos que contêm as notícias  
    $('.results').find('.news-item').each((index, element) => {  
      const title = $(element).find('.news-card-title').text().trim();  
      const link = $(element).find('a').attr('href');  
      const date = $(element).find('.time').text().trim();  

      news.push({  
        title,  
        link: `https://www.hltv.org${link}`, // Construi a URL completa da notícia  
        date,  
      });  
    });  

    return news;  
  } catch (error) {  
    console.error('Error fetching news from HLTV:', error);  
    throw error; // Propaga o erro para que possa ser tratado na rota  
  }  
}  