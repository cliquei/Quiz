import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Target, BarChart3, Users, Award } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import AnimatedCard from "@/components/AnimatedCard";
import { useToast } from "@/hooks/use-toast";
import { StorageUtils } from "@/utils/storage";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [xp, setXp] = useState(250);
  const [completedAssessments, setCompletedAssessments] = useState(3);
  const [realRankings, setRealRankings] = useState<any[]>([]);
  
  // Apenas os últimos 2 testes estão liberados
  const assessments = [
    {
      id: 4,
      title: "Avaliação de Trabalho em Equipe",
      description: "Como você se sai em ambientes colaborativos",
      difficulty: "Médio",
      xpReward: 60,
      completed: false,
      type: "general"
    },
    {
      id: 5,
      title: "📋 Avaliação Odontológica Completa",
      description: "Questionário profissional para dentistas - 25 questões",
      difficulty: "Avançado",
      xpReward: 100,
      completed: false,
      type: "dental"
    }
  ];

  const levels = [
    { xpRequired: 0, title: "Iniciante" },
    { xpRequired: 100, title: "Aprendiz" },
    { xpRequired: 300, title: "Competente" },
    { xpRequired: 600, title: "Proficiente" },
    { xpRequired: 1000, title: "Especialista" }
  ];

  const currentLevelData = levels[currentLevel];
  const nextLevelData = levels[currentLevel + 1];
  const progress = ((xp - currentLevelData.xpRequired) / (nextLevelData.xpRequired - currentLevelData.xpRequired)) * 100;

  const achievements = [
    { title: "Primeiros Passos", description: "Complete sua primeira avaliação", unlocked: true },
    { title: "Mestre das Avaliações", description: "Complete 5 avaliações", unlocked: false },
    { title: "Top 3", description: "Entre no top 3 do ranking", unlocked: false },
    { title: "Nível Máximo", description: "Alcance o nível Especialista", unlocked: false },
    { title: "Especialista Odontológico", description: "Complete a avaliação odontológica", unlocked: false }
  ];

  useEffect(() => {
    // Carregar rankings reais do localStorage
    const rankings = StorageUtils.getRankings();
    setRealRankings(rankings.slice(0, 5)); // Top 5
  }, []);

  const handleStartAssessment = (assessment: any) => {
    if (assessment.type === "dental") {
      navigate("/dental-assessment");
    } else {
      navigate(`/assessment/${assessment.id}`);
    }
    
    toast({
      title: "Avaliação iniciada!",
      description: `Você começou a avaliação: ${assessment.title}`,
    });
  };

  const handleCompleteAssessment = (id: number) => {
    const assessment = assessments.find(a => a.id === id);
    if (assessment) {
      setXp(prev => prev + assessment.xpReward);
      setCompletedAssessments(prev => prev + 1);
      
      toast({
        title: "Avaliação concluída!",
        description: `Você ganhou ${assessment.xpReward} XP!`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Sistema de Avaliação Gamificado
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transforme suas avaliações em uma experiência divertida e motivadora com nosso sistema gamificado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Bloco 1: Progresso do Usuário */}
          <AnimatedCard className="p-6" delay={0.1}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Seu Progresso
              </CardTitle>
              <CardDescription>
                Nível {currentLevel + 1}: {currentLevelData.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">XP: {xp}</span>
                  <span className="text-sm text-gray-500">
                    Próximo nível: {nextLevelData.xpRequired} XP
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    <Target className="w-4 h-4 mr-1" />
                    {completedAssessments} avaliações concluídas
                  </Badge>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>

          {/* Bloco 2: Conquistas */}
          <AnimatedCard className="p-6" delay={0.2}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-500" />
                Conquistas
              </CardTitle>
              <CardDescription>
                Desbloqueie recompensas ao progredir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                    achievement.unlocked 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.unlocked 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Star className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${
                        achievement.unlocked ? 'text-green-800' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {achievement.description}
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Conquistado
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </AnimatedCard>

          {/* Bloco 3: Avaliações Disponíveis */}
          <AnimatedCard className="p-6" delay={0.3}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-500" />
                Avaliações Disponíveis
              </CardTitle>
              <CardDescription>
                Escolha sua próxima avaliação e ganhe XP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {assessments.map((assessment, index) => (
                  <div key={assessment.id} className={`p-4 rounded-lg border ${
                    assessment.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-800">{assessment.title}</h3>
                      <Badge variant={assessment.completed ? "outline" : "secondary"} className={
                        assessment.completed 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : assessment.type === 'dental'
                          ? 'bg-purple-100 text-purple-800 border-purple-200'
                          : 'bg-blue-100 text-blue-800 border-blue-200'
                      }>
                        {assessment.difficulty}
                        {assessment.type === 'dental' && ' 🦷'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{assessment.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-yellow-700 text-sm font-medium">
                          +{assessment.xpReward} XP
                        </span>
                      </div>
                      <Button 
                        size="sm" 
                        variant={assessment.completed ? "outline" : "default"}
                        onClick={() => 
                          assessment.completed 
                            ? handleCompleteAssessment(assessment.id) 
                            : handleStartAssessment(assessment)
                        }
                        className={
                          assessment.completed 
                            ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200' 
                            : assessment.type === 'dental'
                            ? 'bg-purple-600 hover:bg-purple-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }
                      >
                        {assessment.completed ? 'Concluído' : 'Iniciar'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </AnimatedCard>
        </div>

        {/* Bloco 4: Ranking Geral (REAL) - Colocado por último */}
        <AnimatedCard className="p-6 bg-gray-950 text-white" delay={0.4}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="w-6 h-6 text-blue-400" />
              Ranking Geral Real
            </CardTitle>
            <CardDescription className="text-gray-300">
              Top 5 profissionais baseado em desempenho real
            </CardDescription>
          </CardHeader>
          <CardContent>
            {realRankings.length > 0 ? (
              <div className="space-y-3">
                {realRankings.map((player, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-amber-600' : 'bg-blue-400'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-white">{player.nickname}</div>
                        <div className="text-sm text-gray-300">{player.city}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">{player.xp} XP</div>
                      <div className="text-sm text-gray-300">{player.level}</div>
                      {player.score && (
                        <div className="text-xs text-gray-400">{player.score}/5</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-300">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Nenhum resultado ainda</p>
                <p className="text-sm">Seja o primeiro a completar uma avaliação!</p>
              </div>
            )}
          </CardContent>
        </AnimatedCard>

        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;