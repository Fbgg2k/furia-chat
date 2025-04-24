// backend/src/services/get-matches.js  

const axios = require('axios');  
const cheerio = require('cheerio');  

const HLTV_URL = 'https://www.hltv.org/results';  

async function getMatches() {  
  try {  
    const { data } = await axios.get(HLTV_URL);  
    const matches = [];  

    const $ = cheerio.load(data);  

    $('.result-row').each((index, element) => {  
      const match = {  
        date: $(element).find('.result-col.date').text().trim(),  
        team1: $(element).find('.team1 .team-name').text().trim(),  
        team2: $(element).find('.team2 .team-name').text().trim(),  
        score: $(element).find('.result-score').text().trim(),  
        link: $(element).find('a').attr('href'),  
      };  

      if (match.team1.includes('FURIA') || match.team2.includes('FURIA')) {  
        matches.push(match);  
      }  
    });  

    return matches;  
  } catch (error) {  
    console.error('Error fetching matches from HLTV:', error);  
    throw error;  
  }  
}  

module.exports = { getMatches };  