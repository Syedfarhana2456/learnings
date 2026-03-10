import React from 'react';
import { List, Calendar, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';



const PlaylistsSection = ({ playlists }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
        <List className="w-6 h-6 text-blue-500" />
          <CardTitle className="text-2xl">Playlists</CardTitle>
          <Badge variant="secondary">
          {playlists.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>

      {playlists.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <List className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Playlists Created</h3>
          <p className="text-muted-foreground">Create your first playlist to organize your problems!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {playlists.map((playlist) => (
            <Card
              key={playlist.id}
              className="hover:shadow-md transition-all duration-200 bg-blue-50 dark:bg-blue-950/50 group"
            >
              <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {playlist.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {playlist.description}
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>Created {formatDate(playlist.createdAt)}</span>
                </div>
                {playlist.createdAt !== playlist.updatedAt && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Updated {formatDate(playlist.updatedAt)}</span>
                  </div>
                )}
              </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      </CardContent>
    </Card>
  );
};

export default PlaylistsSection;