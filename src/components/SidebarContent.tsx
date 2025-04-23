
'use client';

import React, {useEffect, useState} from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {getFuriaNews, NewsArticle} from '@/services/furia-news';
import {getFuriaPlayers, Player} from '@/services/furia-players';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {ScrollArea} from '@/components/ui/scroll-area';

const SidebarContentComponent: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const loadNews = async () => {
      const newsArticles = await getFuriaNews();
      setNews(newsArticles);
    };

    const loadPlayers = async () => {
      const furiaPlayers = await getFuriaPlayers();
      setPlayers(furiaPlayers);
    };

    loadNews();
    loadPlayers();
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <CardTitle className="text-lg">FURIA</CardTitle>
      </SidebarHeader>
      <SidebarContent>
        <Card>
          <CardHeader>
            <SidebarGroupLabel>Latest News</SidebarGroupLabel>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-500px)]">
              <SidebarMenu>
                {news.map((article, index) => (
                  <SidebarMenuItem key={index}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SidebarGroupLabel>Players</SidebarGroupLabel>
          </CardHeader>
          <CardContent>
            <SidebarMenu>
              {players.map((player) => (
                <SidebarMenuItem key={player.nickname}>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={`https://picsum.photos/id/${player.age + 10}/50/50`} alt={player.nickname} />
                      <AvatarFallback>{player.nickname.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{player.nickname}</span>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </CardContent>
        </Card>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarContentComponent;
