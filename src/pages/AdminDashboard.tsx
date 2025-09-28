import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Award, ArrowLeft } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const leaderboard = [
  { position: 1, name: "Dr. João Silva", xp: 1200, level: "Especialista" },
  { position: 2, name: "Dra. Maria Santos", xp: 980, level: "Proficiente" },
  { position: 3, name: "Dr. Pedro Costa", xp: 850, level: "Proficiente" },
  { position: 4, name: "Dra. Ana Oliveira", xp: 720, level: "Competente" },
  { position: 5, name: "Dr. Carlos Lima", xp: 650, level: "Competente" }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bccEmail, setBccEmail] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminBccEmail") || "";
    }
    return "";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adminBccEmail", bccEmail);
    }
  }, [bccEmail]);

  const handleSaveBccEmail = () => {
    toast({
      title: "Configuração de E-mail",
      description: `E-mail BCC '${bccEmail}' salvo localmente. Para envio real e persistência em múltiplos dispositivos, um backend é necessário.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Início
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Painel de Administração
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gerencie o sistema de avaliação e configurações.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Bloco: Ranking Geral */}
          <AnimatedCard className="p-6" delay={0.1}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-500" />
                Ranking Geral
              </CardTitle>
              <CardDescription>
                Top 5 profissionais da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div key={player.position} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-400' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-amber-600' : 'bg-blue-400'
                      }`}>
                        {player.position}
                      </div>
                      <div>
                        <div className="font-medium">{player.name}</div>
                        <div className="text-sm text-gray-500">{player.level}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{player.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </AnimatedCard>

          {/* Bloco: Configurações de E-mail (BCC) */}
          <AnimatedCard className="p-6" delay={0.2}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-green-500" />
                Configurações de E-mail
              </CardTitle>
              <CardDescription>
                Configure o e-mail para receber cópias (BCC) dos resultados.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bcc-email">E-mail BCC</Label>
                <Input
                  id="bcc-email"
                  type="email"
                  placeholder="admin@exemplo.com"
                  value={bccEmail}
                  onChange={(e) => setBccEmail(e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Para que o envio de e-mails funcione e esta configuração seja persistente em múltiplos dispositivos,
                  você precisará de uma integração de backend (ex: Supabase, SendGrid).
                </p>
              </div>
              <Button onClick={handleSaveBccEmail} className="w-full bg-green-600 hover:bg-green-700">
                Salvar E-mail BCC
              </Button>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => {
                  toast({
                    title: "Integração de Backend Necessária",
                    description: "Para enviar e-mails e gerenciar configurações de forma persistente, você precisa adicionar um backend ao seu aplicativo.",
                    duration: 5000,
                  });
                }}
              >
                Adicionar Backend para E-mails
              </Button>
            </CardContent>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;