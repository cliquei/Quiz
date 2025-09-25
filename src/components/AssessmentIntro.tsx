"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const AssessmentIntro = ({ onStart }: { onStart: () => void }) => {
  const blocks = [
    { 
      title: "Formação e Conhecimento Técnico", 
      color: "bg-blue-900",
      description: "Atualização profissional e domínio técnico"
    },
    { 
      title: "Habilidades Clínicas e Atuação Prática", 
      color: "bg-blue-300",
      description: "Eficiência e resolução de complicações"
    },
    { 
      title: "Gestão de Carreira e Negócios", 
      color: "bg-gray-400",
      description: "Precificação, marketing e planejamento"
    },
    { 
      title: "Relacionamento e Humanização", 
      color: "bg-amber-50",
      description: "Comunicação empática e experiência do paciente"
    },
    { 
      title: "Inovação e Futuro", 
      color: "bg-blue-800",
      description: "Tecnologia e visão estratégica"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Teste seu Conhecimento
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Descubra sua nota em gestão de clínicas
          </p>
          <p className="text-lg text-gray-600">
            Com este teste descubra as áreas onde precisa melhorar para alcançar novos patamares
          </p>
        </div>

        <Card className="mb-8 border-2 border-blue-300 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">📋 Questionário de Avaliação do Nível Profissional em Odontologia</h2>
                <p className="text-gray-700 mb-4">
                  Este teste foi desenvolvido para avaliar seu nível profissional em 5 áreas essenciais para o sucesso na odontologia moderna.
                </p>
                <ul className="list-disc pl-5 text-gray-700 mb-6 space-y-2">
                  <li>25 perguntas práticas e relevantes</li>
                  <li>Avaliação em 5 áreas distintas</li>
                  <li>Resultado imediato com análise detalhada</li>
                  <li>Recomendações personalizadas</li>
                </ul>
                <Button 
                  onClick={onStart}
                  className="bg-blue-900 hover:bg-blue-800 text-white text-lg py-6 px-8 w-full md:w-auto"
                >
                  Iniciar Avaliação <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="bg-blue-900 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">🔎 Interpretação dos Resultados</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-amber-100 text-blue-900 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1-2</div>
                      <div>
                        <p className="font-bold">Nível Básico</p>
                        <p className="text-sm">Necessário investir em formação, técnica e visão de carreira</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-amber-100 text-blue-900 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</div>
                      <div>
                        <p className="font-bold">Nível Intermediário</p>
                        <p className="text-sm">Bom domínio, mas ainda precisa desenvolver consistência e visão estratégica</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-amber-100 text-blue-900 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">4-5</div>
                      <div>
                        <p className="font-bold">Nível Avançado</p>
                        <p className="text-sm">Profissional consolidado tecnicamente e com carreira estruturada</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Áreas Avaliadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {blocks.map((block, index) => (
              <div 
                key={index} 
                className={`${block.color} p-4 rounded-lg text-white h-full flex flex-col`}
              >
                <Badge variant="secondary" className="self-start mb-3 bg-white text-blue-900">
                  Bloco {index + 1}
                </Badge>
                <h3 className="font-bold text-lg mb-2">{block.title}</h3>
                <p className="text-sm mt-auto">{block.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-blue-200 shadow-sm">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Como funciona?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start">
              <div className="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</div>
              <div>
                <p className="font-bold">Responda às perguntas</p>
                <p className="text-sm text-gray-600">Avalie de 1 a 5 sua competência em cada área</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</div>
              <div>
                <p className="font-bold">Receba seu resultado</p>
                <p className="text-sm text-gray-600">Veja sua pontuação em cada bloco e o resultado geral</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</div>
              <div>
                <p className="font-bold">Identifique melhorias</p>
                <p className="text-sm text-gray-600">Descubra onde investir para evoluir profissionalmente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntro;