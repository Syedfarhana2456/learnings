import React from 'react';
import { User, Mail, Calendar, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';



const UserInfoCard = ({ userData }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <Avatar className="w-24 h-24 border-4 border-primary/20">
            <AvatarImage 
              src={userData.imageUrl} 
              alt={`${userData.firstName} ${userData.lastName}`}
            />
            <AvatarFallback className="text-2xl font-bold">
              {userData.firstName[0]}{userData.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2">
            <Shield className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">
            {userData.firstName} {userData.lastName}
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{userData.email}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Badge variant={userData.role === 'ADMIN' ? 'destructive' : 'secondary'}>
                {userData.role}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Calendar className="w-4 h-4" />
              <span>Joined {formatDate(userData.createdAt)}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <User className="w-4 h-4" />
              <span>Last active {formatDate(userData.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;