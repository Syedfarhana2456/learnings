import React from 'react';
import { Trophy, CheckCircle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


const SolvedProblems = ({ solvedProblems }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-3">
        <Trophy className="w-6 h-6 text-green-500" />
          <CardTitle className="text-2xl">Solved Problems</CardTitle>
          <Badge variant="success">
          {solvedProblems.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>

      {solvedProblems.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Problems Solved Yet</h3>
          <p className="text-muted-foreground">Start solving problems to see your achievements here!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {solvedProblems.map((problem) => (
            <Card
              key={problem.id}
              className="hover:shadow-md transition-all duration-200 bg-green-50 dark:bg-green-950/50"
            >
              <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">
                    Problem Solved
                  </h3>
                  <div className="text-sm text-muted-foreground mb-3">
                    <Badge variant="outline" className="font-mono text-xs">
                      {problem.problemId.slice(0, 8)}...
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Solved on {formatDate(problem.createdAt)}</span>
                  </div>
                </div>
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

export default SolvedProblems;