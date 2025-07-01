import React, { useState, useEffect, useMemo } from 'react';

// Ícones SVG para uma interface mais limpa, sem dependências externas
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const BookOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 14a1 1 0 01-1-1v- симптомы-1h4v1a1 1 0 01-1 1H8z" />
        <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 2zM5.5 5.5A.75.75 0 016.25 4h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zm8.5 0a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM10 18a.75.75 0 01-.75-.75v-3.5a.75.75 0 011.5 0v3.5A.75.75 0 0110 18z" clipRule="evenodd" />
        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm3.293 8.293a1 1 0 011.414 0L10 17.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
    </svg>
);

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);


// DADOS MOCADOS INICIAIS - Simula o que estaria no banco de dados
const initialData = {
    topics: [
        {
            id: 1,
            name: "História da Computação",
            original_description: "Um longo texto sobre a história da computação, desde o ábaco até os computadores quânticos...",
            status: 'processed', // 'processing' ou 'processed'
            chunks: [
                { id: 101, topic_id: 1, title: "O Ábaco", content: "O ábaco foi um dos primeiros instrumentos desenvolvidos para auxiliar nos cálculos.", progress: 'mastered' },
                { id: 102, topic_id: 1, title: "Máquina de Pascal", content: "Blaise Pascal inventou a primeira calculadora mecânica em 1642.", progress: 'reviewed_multiple' },
                { id: 103, topic_id: 1, title: "Charles Babbage", content: "Considerado o 'pai do computador', projetou a Máquina Analítica.", progress: 'reviewed_once' },
                { id: 104, topic_id: 1, title: "ENIAC", content: "O primeiro computador eletrônico de grande escala.", progress: 'not_started' },
                ...Array.from({ length: 46 }, (_, i) => ({ id: 105 + i, topic_id: 1, title: `Conceito ${i + 1}`, content: `Conteúdo do conceito ${i + 1}.`, progress: 'not_started' }))
            ]
        }
    ]
};

// COMPONENTES DA UI

// Modal para exibir o conteúdo do Chunk
const ChunkModal = ({ chunk, onClose, onUpdateProgress }) => {
    if (!chunk) return null;

    const progressLevels = ['not_started', 'reviewed_once', 'reviewed_multiple', 'mastered'];
    
    const handleProgress = () => {
        const currentIndex = progressLevels.indexOf(chunk.progress);
        const nextIndex = (currentIndex + 1) % progressLevels.length;
        onUpdateProgress(chunk.id, progressLevels[nextIndex]);
    };
    
    const getButtonText = () => {
        switch(chunk.progress) {
            case 'not_started': return "Marcar como Revisado";
            case 'reviewed_once': return "Revisar Novamente";
            case 'reviewed_multiple': return "Marcar como Dominado";
            case 'mastered': return "Revisão Concluída";
            default: return "Atualizar Progresso";
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl text-white border border-gray-700 transform transition-all duration-300 scale-95 hover:scale-100">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-cyan-400">{chunk.title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>
                <div className="text-gray-300 mb-6 prose prose-invert max-w-none">
                    <p>{chunk.content}</p>
                </div>
                <div className="flex justify-end">
                    <button 
                        onClick={handleProgress}
                        disabled={chunk.progress === 'mastered'}
                        className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200"
                    >
                        {getButtonText()}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Painel de Atividade (Grade de Chunks)
const ActivityPanelView = ({ topic, onChunkSelect, onUpdateProgress }) => {
    const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

    const getProgressColor = (progress) => {
        switch (progress) {
            case 'mastered': return 'bg-green-700';
            case 'reviewed_multiple': return 'bg-green-500';
            case 'reviewed_once': return 'bg-green-300';
            case 'not_started':
            default:
                return 'bg-gray-700';
        }
    };

    const handleMouseEnter = (e, title) => {
        setTooltip({
            visible: true,
            content: title,
            x: e.clientX,
            y: e.clientY
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, content: '', x: 0, y: 0 });
    };

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-white mb-2">{topic.name}</h2>
            <p className="text-gray-400 mb-6">Clique em um quadrado para estudar o chunk correspondente.</p>
            
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-7 md:grid-cols-10 lg:grid-cols-15 gap-1.5">
                    {topic.chunks.map(chunk => (
                        <div
                            key={chunk.id}
                            onClick={() => onChunkSelect(chunk)}
                            onMouseEnter={(e) => handleMouseEnter(e, chunk.title)}
                            onMouseLeave={handleMouseLeave}
                            className={`w-full aspect-square rounded-sm cursor-pointer transition-transform duration-150 hover:scale-110 ${getProgressColor(chunk.progress)}`}
                        />
                    ))}
                </div>
            </div>
            {tooltip.visible && (
                <div className="fixed z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded-md" style={{ top: tooltip.y + 15, left: tooltip.x + 15 }}>
                    {tooltip.content}
                </div>
            )}
        </div>
    );
};


// Formulário de Criação de Tópico
const TopicCreationForm = ({ onTopicCreate, onBack }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() && description.trim()) {
            onTopicCreate(name, description);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <button onClick={onBack} className="flex items-center mb-6 text-cyan-400 hover:text-cyan-300">
                <BackIcon />
                Voltar ao Painel
            </button>
            <h2 className="text-3xl font-bold text-white mb-6">Criar Novo Tópico de Estudo</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="topic-name" className="block text-sm font-medium text-gray-300 mb-2">Nome do Tópico</label>
                    <input
                        id="topic-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Fundamentos de Inteligência Artificial"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="topic-description" className="block text-sm font-medium text-gray-300 mb-2">Descrição / Conteúdo</label>
                    <textarea
                        id="topic-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="10"
                        placeholder="Cole aqui o texto denso que você deseja transformar em módulos de aprendizado..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center items-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-colors duration-200">
                        <PlusIcon />
                        <span className="ml-2">Gerar Módulos de Estudo</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

// Tela Principal (Dashboard)
const Dashboard = ({ topics, onTopicSelect, onCreateNew }) => {
    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Seus Tópicos de Estudo</h1>
                <button onClick={onCreateNew} className="flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors">
                    <PlusIcon />
                    <span className="ml-2 hidden md:inline">Novo Tópico</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map(topic => (
                    <div key={topic.id} className="bg-gray-800 border border-gray-700 rounded-lg p-5 cursor-pointer hover:border-cyan-500 transition-all duration-200" onClick={() => onTopicSelect(topic.id)}>
                        <h3 className="text-xl font-bold text-white truncate mb-2">{topic.name}</h3>
                        {topic.status === 'processing' ? (
                            <div className="flex items-center text-yellow-400">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400 mr-2"></div>
                                <span>Processando...</span>
                            </div>
                        ) : (
                             <div className="flex items-center text-gray-400">
                                <BookOpenIcon />
                                <span>{topic.chunks.length} chunks</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
             {topics.length === 0 && (
                <div className="text-center py-16 px-6 bg-gray-800 border-2 border-dashed border-gray-700 rounded-lg">
                    <h3 className="text-xl font-semibold text-white">Nenhum tópico encontrado</h3>
                    <p className="text-gray-400 mt-2">Clique em "Novo Tópico" para começar a aprender!</p>
                </div>
            )}
        </div>
    );
};


// Componente Principal da Aplicação
export default function App() {
    const [topics, setTopics] = useState(initialData.topics);
    const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'create', 'topic'
    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [selectedChunk, setSelectedChunk] = useState(null);

    const handleTopicCreate = (name, description) => {
        const newTopic = {
            id: Date.now(),
            name,
            original_description: description,
            status: 'processing', // RNF-01: Estado de processamento
            chunks: []
        };
        setTopics(prev => [...prev, newTopic]);
        setCurrentView('dashboard');

        // Simula a chamada à API da DeepSeek e o processamento
        setTimeout(() => {
            // Simula a resposta da API com chunks gerados
            const generatedChunks = Array.from({ length: Math.floor(Math.random() * 40) + 10 }, (_, i) => ({
                id: Date.now() + i + 1,
                topic_id: newTopic.id,
                title: `Chunk Gerado ${i + 1}`,
                content: `Este é o conteúdo autogerado para o chunk ${i + 1}, baseado na descrição fornecida.`,
                progress: 'not_started'
            }));

            setTopics(prevTopics => prevTopics.map(t =>
                t.id === newTopic.id ? { ...t, status: 'processed', chunks: generatedChunks } : t
            ));
        }, 3000); // Atraso de 3 segundos para simular a API
    };

    const handleUpdateChunkProgress = (chunkId, newProgress) => {
        setTopics(prevTopics => prevTopics.map(topic => {
            if (topic.id !== selectedTopicId) return topic;
            const updatedChunks = topic.chunks.map(chunk =>
                chunk.id === chunkId ? { ...chunk, progress: newProgress } : chunk
            );
            return { ...topic, chunks: updatedChunks };
        }));
        // Atualiza o chunk no modal também para refletir a mudança
        setSelectedChunk(prev => prev ? { ...prev, progress: newProgress } : null);
    };
    
    const selectedTopic = useMemo(() => {
        return topics.find(t => t.id === selectedTopicId);
    }, [topics, selectedTopicId]);


    const renderContent = () => {
        switch (currentView) {
            case 'create':
                return <TopicCreationForm onTopicCreate={handleTopicCreate} onBack={() => setCurrentView('dashboard')} />;
            case 'topic':
                if (selectedTopic && selectedTopic.status === 'processed') {
                    return (
                        <>
                         <button onClick={() => setCurrentView('dashboard')} className="flex items-center m-4 md:m-8 text-cyan-400 hover:text-cyan-300">
                            <BackIcon />
                            Voltar ao Painel
                        </button>
                        <ActivityPanelView 
                            topic={selectedTopic} 
                            onChunkSelect={setSelectedChunk}
                            onUpdateProgress={handleUpdateChunkProgress}
                        />
                        </>
                    );
                }
                // Poderia ter um loading state aqui também
                return <div className="text-white text-center p-10">Carregando tópico...</div>;
            case 'dashboard':
            default:
                return (
                    <Dashboard 
                        topics={topics} 
                        onTopicSelect={(id) => { setSelectedTopicId(id); setCurrentView('topic'); }}
                        onCreateNew={() => setCurrentView('create')}
                    />
                );
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white font-sans">
            <div className="container mx-auto px-4 py-8">
                {renderContent()}
            </div>
            <ChunkModal 
                chunk={selectedChunk} 
                onClose={() => setSelectedChunk(null)} 
                onUpdateProgress={handleUpdateChunkProgress}
            />
        </div>
    );
}
