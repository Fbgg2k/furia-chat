// backend/src/services/players.js  

import axios from 'axios';  
import * as cheerio from 'cheerio'; // Modifique a importação para usar * as  

const HLTV_PLAYERS_URL = 'https://www.hltv.org/stats/players'; // URL da página de jogadores  

export async function getPlayers() {  
  try {  
    const { data } = await axios.get(HLTV_PLAYERS_URL);  
    const players = [];  

    const $ = cheerio.load(data);  

    // Seleciona os elementos que contêm os jogadores  
    $('tr.player-row').each((index, element) => {  
      const name = $(element).find('.player-nick').text().trim();  
      const team = $(element).find('.team').text().trim();  
      const rating = $(element).find('.rating').text().trim();  
      const link = $(element).find('a').attr('href');  

      // Filtra apenas os jogadores da FURIA  
      if (team.includes('FURIA')) {  
        players.push({  
          name,  
          team,  
          rating,  
          link: `https://www.hltv.org${link}`, // Construi a URL completa do jogador  
        });  
      }  
    });  

    return players;  
  } catch (error) {  
    console.error('Error fetching players from HLTV:', error);  
    throw error; // Propaga o erro para que possa ser tratado na rota  
  }  
}  