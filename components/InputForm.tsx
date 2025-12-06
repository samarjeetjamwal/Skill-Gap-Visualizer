import React, { useState, ChangeEvent } from 'react';

interface InputFormProps {
  onAnalyze: (resume: string, target: string) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onAnalyze, isLoading }) => {
  const [resumeText, setResumeText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim() || !targetText.trim()) return;
    onAnalyze(resumeText, targetText);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, type: 'resume' | 'target') => {
    const file = e.target.files?.[0];
    if (file) {
      // Simple text file reading for demo purposes
      // In production, this would handle PDF/Docx via a backend service or specialized library
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (type === 'resume') setResumeText(text);
        else setTargetText(text);
      };
      reader.readAsText(file);
    }
  };

  const loadSampleData = () => {
    setResumeText(`
      Jane Doe
      Software Engineer with 3 years experience.
      Skills: JavaScript, React, HTML, CSS.
      Experience: Built responsive websites using React and Redux.
      Education: BS Computer Science.
    `);
    setTargetText(`
      Senior Frontend Engineer
      Requirements:
      - 5+ years experience with React and TypeScript.
      - Strong knowledge of Node.js and GraphQL.
      - Experience with Cloud Platforms (AWS/GCP).
      - Leadership skills and ability to mentor juniors.
      - CI/CD pipeline configuration.
    `);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('text')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'text' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Paste Text
            </button>
            <button
              onClick={() => setActiveTab('file')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'file' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Upload Files
            </button>
          </div>
          
          <button 
            onClick={loadSampleData}
            className="text-sm text-primary hover:underline font-medium"
          >
            Load Sample Data
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Resume Input */}
            <div className="flex flex-col">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Current Skills / Resume</label>
              {activeTab === 'text' ? (
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume or list your skills here..."
                  className="w-full h-64 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-slate-50 text-slate-800 text-sm"
                  required
                />
              ) : (
                <div className="h-64 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-slate-100 transition-colors">
                  <svg className="w-10 h-10 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-slate-500 mb-2">Select a text file</p>
                  <input type="file" accept=".txt,.md,.json" onChange={(e) => handleFileChange(e, 'resume')} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-indigo-700" />
                  {resumeText && <p className="text-xs text-emerald-600 mt-2 font-medium">File Loaded</p>}
                </div>
              )}
            </div>

            {/* Target Input */}
            <div className="flex flex-col">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Target Role / Job Description</label>
              {activeTab === 'text' ? (
                <textarea
                  value={targetText}
                  onChange={(e) => setTargetText(e.target.value)}
                  placeholder="Paste the job description or target skills here..."
                  className="w-full h-64 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-slate-50 text-slate-800 text-sm"
                  required
                />
              ) : (
                <div className="h-64 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-slate-100 transition-colors">
                  <svg className="w-10 h-10 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-slate-500 mb-2">Select a text file</p>
                  <input type="file" accept=".txt,.md,.json" onChange={(e) => handleFileChange(e, 'target')} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-indigo-700" />
                   {targetText && <p className="text-xs text-emerald-600 mt-2 font-medium">File Loaded</p>}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={isLoading || !resumeText || !targetText}
              className={`px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center ${
                isLoading || !resumeText || !targetText 
                  ? 'bg-slate-400 cursor-not-allowed shadow-none' 
                  : 'bg-primary hover:bg-indigo-700 hover:shadow-primary/30'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Generate Gap Analysis'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};