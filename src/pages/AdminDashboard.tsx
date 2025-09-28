import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Award, ArrowLeft, PlusCircle, Edit, Trash2, LogOut, Lock, Unlock } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useAssessments } from "@/hooks/use-assessments";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AssessmentType, Question } from "@/data/initialAssessments"; // Importar AssessmentType e Question

const leaderboard = [
  { position: 1, name: "Dr. João Silva", xp: 1200, level: "Especialista" },
  { position: 2, name: "Dra. Maria Santos", xp: 980, level: "Proficiente" },
  { position: 3, name: "Dr. Pedro Costa", xp: 850, level: "Proficiente" },
  { position: 4, name: "Dra. Ana Oliveira", xp: 720, level: "Competente" },
  { position: 5, name: "Dr. Carlos Lima", xp: 650, level: "Competente" }
];

// Definir um tipo para o estado do formulário de nova avaliação
type NewAssessmentFormState = Omit<AssessmentType, 'id' | 'completed' | 'suggestions'>;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout, ADMIN_USERNAME, ADMIN_PASSWORD } = useAdminAuth();
  const { assessments, addAssessment, updateAssessment, deleteAssessment, addQuestionToAssessment, updateQuestionInAssessment, deleteQuestionFromAssessment } = useAssessments();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bccEmail, setBccEmail] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminBccEmail") || "";
    }
    return "";
  });

  const [editingAssessment, setEditingAssessment] = useState<AssessmentType | null>(null); // Usar AssessmentType
  const [editingQuestion, setEditingQuestion] = useState<Question & { assessmentId: number } | null>(null); // Usar Question
  const [showAddAssessmentForm, setShowAddAssessmentForm] = useState(false);
  const [newAssessmentData, setNewAssessmentData] = useState<NewAssessmentFormState>(() => ({
    title: "",
    description: "",
    difficulty: "Fácil",
    xpReward: 0,
    type: "general",
    questions: [],
  }));
  const [newQuestionData, setNewQuestionData] = useState<Omit<Question, 'id'>>({ // Usar Omit<Question, 'id'>
    question: "",
    options: ["", "", "", "", ""],
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adminBccEmail", bccEmail);
    }
  }, [bccEmail]);

  const handleLogin = () => {
    if (login(username, password)) {
      toast({
        title: "Login bem-sucedido!",
        description: "Bem-vindo, administrador.",
      });
    } else {
      toast({
        title: "Erro de Login",
        description: "Credenciais inválidas.",
        variant: "destructive",
      });
    }
  };

  const handleSaveBccEmail = () => {
    toast({
      title: "Configuração de E-mail",
      description: `E-mail BCC '${bccEmail}' salvo localmente. Para envio real e persistência em múltiplos dispositivos, um backend é necessário.`,
    });
  };

  const handleAddAssessment = () => {
    if (!newAssessmentData.title || !newAssessmentData.description || !newAssessmentData.difficulty || newAssessmentData.xpReward <= 0) {
      toast({ title: "Erro", description: "Por favor, preencha todos os campos da avaliação.", variant: "destructive" });
      return;
    }
    addAssessment(newAssessmentData);
    setNewAssessmentData({ title: "", description: "", difficulty: "Fácil", xpReward: 0, type: "general", questions: [] });
    setShowAddAssessmentForm(false);
    toast({ title: "Sucesso", description: "Avaliação adicionada!" });
  };

  const handleUpdateAssessment = () => {
    if (!editingAssessment || !editingAssessment.title || !editingAssessment.description || !editingAssessment.difficulty || editingAssessment.xpReward <= 0) {
      toast({ title: "Erro", description: "Por favor, preencha todos os campos da avaliação.", variant: "destructive" });
      return;
    }
    updateAssessment(editingAssessment);
    setEditingAssessment(null);
    toast({ title: "Sucesso", description: "Avaliação atualizada!" });
  };

  const handleDeleteAssessment = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta avaliação?")) {
      deleteAssessment(id);
      toast({ title: "Sucesso", description: "Avaliação excluída!" });
    }
  };

  const handleAddQuestion = (assessmentId: number) => {
    if (!newQuestionData.question || newQuestionData.options.some(opt => !opt)) {
      toast({ title: "Erro", description: "Por favor, preencha a pergunta e todas as opções.", variant: "destructive" });
      return;
    }
    addQuestionToAssessment(assessmentId, newQuestionData);
    setNewQuestionData({ question: "", options: ["", "", "", "", ""] });
    toast({ title: "Sucesso", description: "Pergunta adicionada!" });
  };

  const handleUpdateQuestion = (assessmentId: number) => {
    if (!editingQuestion || !editingQuestion.question || editingQuestion.options.some((opt: string) => !opt)) {
      toast({ title: "Erro", description: "Por favor, preencha a pergunta e todas as opções.", variant: "destructive" });
      return;
    }
    updateQuestionInAssessment(assessmentId, editingQuestion);
    setEditingQuestion(null);
    toast({ title: "Sucesso", description: "Pergunta atualizada!" });
  };

  const handleDeleteQuestion = (assessmentId: number, questionId: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta pergunta?")) {
      deleteQuestionFromAssessment(assessmentId, questionId);
      toast({ title: "Sucesso", description: "Pergunta excluída!" });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Card className="w-full max-w-md p-6">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Login do Administrador</CardTitle>
            <CardDescription>Acesse o painel para gerenciar avaliações.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="password123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700">
              <Lock className="w-4 h-4 mr-2" />
              Entrar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Início
          </Button>
          <Button onClick={logout} variant="outline" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

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

        {/* Bloco: Gerenciamento de Avaliações */}
        <AnimatedCard className="p-6 mb-12" delay={0.3}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Unlock className="w-6 h-6 text-purple-500" />
              Gerenciar Avaliações
            </CardTitle>
            <CardDescription>
              Adicione, edite ou exclua avaliações e suas perguntas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setShowAddAssessmentForm(!showAddAssessmentForm)} className="mb-4">
              <PlusCircle className="w-4 h-4 mr-2" />
              {showAddAssessmentForm ? "Cancelar Adição" : "Adicionar Nova Avaliação"}
            </Button>

            {showAddAssessmentForm && (
              <div className="border p-4 rounded-lg mb-6 bg-gray-50 space-y-3">
                <h3 className="text-lg font-semibold">Nova Avaliação</h3>
                <div>
                  <Label htmlFor="new-title">Título</Label>
                  <Input id="new-title" value={newAssessmentData.title} onChange={(e) => setNewAssessmentData({ ...newAssessmentData, title: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="new-description">Descrição</Label>
                  <Textarea id="new-description" value={newAssessmentData.description} onChange={(e) => setNewAssessmentData({ ...newAssessmentData, description: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="new-difficulty">Dificuldade</Label>
                  <Select value={newAssessmentData.difficulty} onValueChange={(value: "Fácil" | "Médio" | "Difícil" | "Avançado") => setNewAssessmentData({ ...newAssessmentData, difficulty: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a dificuldade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fácil">Fácil</SelectItem>
                      <SelectItem value="Médio">Médio</SelectItem>
                      <SelectItem value="Difícil">Difícil</SelectItem>
                      <SelectItem value="Avançado">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="new-xp">Recompensa XP</Label>
                  <Input id="new-xp" type="number" value={newAssessmentData.xpReward} onChange={(e) => setNewAssessmentData({ ...newAssessmentData, xpReward: parseInt(e.target.value) || 0 })} />
                </div>
                <div>
                  <Label htmlFor="new-type">Tipo</Label>
                  <Select value={newAssessmentData.type} onValueChange={(value: "general" | "dental") => setNewAssessmentData({ ...newAssessmentData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Geral</SelectItem>
                      <SelectItem value="dental">Odontológica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddAssessment} className="w-full">Salvar Avaliação</Button>
              </div>
            )}

            <div className="space-y-4">
              {assessments.map((assessment) => (
                <Card key={assessment.id} className="p-4">
                  <CardHeader className="flex-row items-center justify-between p-0 pb-2">
                    <CardTitle className="text-xl">{assessment.title}</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingAssessment(assessment)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteAssessment(assessment.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 text-sm text-gray-600">
                    <p>{assessment.description}</p>
                    <p>Dificuldade: {assessment.difficulty} | XP: {assessment.xpReward} | Tipo: {assessment.type}</p>
                  </CardContent>

                  {editingAssessment && editingAssessment.id === assessment.id && (
                    <div className="border p-4 rounded-lg mt-4 bg-blue-50 space-y-3">
                      <h3 className="text-lg font-semibold">Editar Avaliação</h3>
                      <div>
                        <Label htmlFor={`edit-title-${assessment.id}`}>Título</Label>
                        <Input id={`edit-title-${assessment.id}`} value={editingAssessment.title} onChange={(e) => setEditingAssessment({ ...editingAssessment, title: e.target.value })} />
                      </div>
                      <div>
                        <Label htmlFor={`edit-description-${assessment.id}`}>Descrição</Label>
                        <Textarea id={`edit-description-${assessment.id}`} value={editingAssessment.description} onChange={(e) => setEditingAssessment({ ...editingAssessment, description: e.target.value })} />
                      </div>
                      <div>
                        <Label htmlFor={`edit-difficulty-${assessment.id}`}>Dificuldade</Label>
                        <Select value={editingAssessment.difficulty} onValueChange={(value: "Fácil" | "Médio" | "Difícil" | "Avançado") => setEditingAssessment({ ...editingAssessment, difficulty: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a dificuldade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Fácil">Fácil</SelectItem>
                            <SelectItem value="Médio">Médio</SelectItem>
                            <SelectItem value="Difícil">Difícil</SelectItem>
                            <SelectItem value="Avançado">Avançado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`edit-xp-${assessment.id}`}>Recompensa XP</Label>
                        <Input id={`edit-xp-${assessment.id}`} type="number" value={editingAssessment.xpReward} onChange={(e) => setEditingAssessment({ ...editingAssessment, xpReward: parseInt(e.target.value) || 0 })} />
                      </div>
                      <div>
                        <Label htmlFor={`edit-type-${assessment.id}`}>Tipo</Label>
                        <Select value={editingAssessment.type} onValueChange={(value: "general" | "dental") => setEditingAssessment({ ...editingAssessment, type: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">Geral</SelectItem>
                            <SelectItem value="dental">Odontológica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleUpdateAssessment} className="w-full">Atualizar Avaliação</Button>
                      <Button variant="outline" onClick={() => setEditingAssessment(null)} className="w-full mt-2">Cancelar</Button>
                    </div>
                  )}

                  {/* Gerenciamento de Perguntas */}
                  {assessment.type === "general" && ( // Apenas para avaliações gerais, pois a dental tem perguntas fixas
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-semibold mb-2">Perguntas:</h4>
                      <div className="space-y-2">
                        {assessment.questions.map((question) => (
                          <div key={question.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <span className="text-sm">{question.question}</span>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" onClick={() => setEditingQuestion({ ...question, assessmentId: assessment.id })}>
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteQuestion(assessment.id, question.id)}>
                                <Trash2 className="w-3 h-3 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {editingQuestion && editingQuestion.assessmentId === assessment.id && (
                        <div className="border p-4 rounded-lg mt-4 bg-yellow-50 space-y-3">
                          <h3 className="text-lg font-semibold">Editar Pergunta</h3>
                          <div>
                            <Label htmlFor={`edit-q-text-${editingQuestion.id}`}>Pergunta</Label>
                            <Input id={`edit-q-text-${editingQuestion.id}`} value={editingQuestion.question} onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })} />
                          </div>
                          {editingQuestion.options.map((option: string, idx: number) => (
                            <div key={idx}>
                              <Label htmlFor={`edit-q-opt-${editingQuestion.id}-${idx}`}>Opção {idx + 1}</Label>
                              <Input id={`edit-q-opt-${editingQuestion.id}-${idx}`} value={option} onChange={(e) => {
                                const newOptions = [...editingQuestion.options];
                                newOptions[idx] = e.target.value;
                                setEditingQuestion({ ...editingQuestion, options: newOptions });
                              }} />
                            </div>
                          ))}
                          <Button onClick={() => handleUpdateQuestion(assessment.id)} className="w-full">Atualizar Pergunta</Button>
                          <Button variant="outline" onClick={() => setEditingQuestion(null)} className="w-full mt-2">Cancelar</Button>
                        </div>
                      )}

                      <div className="mt-4 border-t pt-4 space-y-3 bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold">Adicionar Nova Pergunta</h4>
                        <div>
                          <Label htmlFor={`add-q-text-${assessment.id}`}>Pergunta</Label>
                          <Input id={`add-q-text-${assessment.id}`} value={newQuestionData.question} onChange={(e) => setNewQuestionData({ ...newQuestionData, question: e.target.value })} />
                        </div>
                        {newQuestionData.options.map((option, idx) => (
                          <div key={idx}>
                            <Label htmlFor={`add-q-opt-${assessment.id}-${idx}`}>Opção {idx + 1}</Label>
                            <Input id={`add-q-opt-${assessment.id}-${idx}`} value={option} onChange={(e) => {
                              const newOptions = [...newQuestionData.options];
                              newOptions[idx] = e.target.value;
                              setNewQuestionData({ ...newQuestionData, options: newOptions });
                            }} />
                          </div>
                        ))}
                        <Button onClick={() => handleAddQuestion(assessment.id)} className="w-full">Adicionar Pergunta</Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </CardContent>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default AdminDashboard;