import React, { useEffect, useState } from 'react';
import { Compass, Sparkles, Plus, ExternalLink } from 'lucide-react';
import { aiApi } from '../lib/api';
import type { AIRecommendation } from '../lib/api';

export default function Discover() {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const data = await aiApi.getRecommendations();
        setRecommendations(data);
      } catch (error) {
        console.error("Failed to load recommendations", error);
      } finally {
        setLoading(false);
      }
    }
    loadRecommendations();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="page-header mb-8">
        <h1 className="text-4xl font-bold font-serif mb-2 flex items-center gap-3">
          Discover <Compass className="text-cyan-500" />
        </h1>
        <p className="text-gray-400">Personalized recommendations to fuel your growth journey.</p>
      </div>

      <div className="discover-hero mb-12">
        <div className="relative z-10 max-w-2xl">
          <div className="badge badge-amber mb-4"><Sparkles size={12} /> AI Curated Path</div>
          <h2 className="text-3xl font-serif font-bold mb-4">Mastering Deep Focus</h2>
          <p className="text-gray-300 text-lg mb-6">
            Based on your recent interest in productivity and your goal to "Develop Leadership Skills", 
            this reading path is designed to help you cultivate the ability to perform deep, meaningful work 
            in an increasingly distracted world.
          </p>
          <button className="btn btn-primary">Explore Path</button>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="font-serif text-2xl mb-6">Recommended For You</h3>
        
        {loading ? (
          <div className="py-12 text-center text-gray-400">Finding perfect matches...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="card hover:border-white/20 transition-all flex flex-col sm:flex-row gap-6 relative overflow-hidden group">
                <div className="match-score z-10">{Math.round(rec.match_score * 100)}% Match</div>
                
                <div className="w-24 h-36 rounded-md overflow-hidden shrink-0 shadow-md">
                  {rec.cover_url ? (
                    <img src={rec.cover_url} alt={rec.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-2 text-center text-xs font-serif leading-tight">
                      {rec.title}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="mb-1 text-xs text-gray-400">{rec.genre}</div>
                  <h4 className="font-bold text-lg leading-tight mb-1">{rec.title}</h4>
                  <div className="text-sm text-gray-400 mb-3">{rec.author}</div>
                  
                  <p className="text-xs text-gray-300 mb-4 line-clamp-3 leading-relaxed flex-1 italic">
                    "{rec.reason}"
                  </p>
                  
                  <div className="flex gap-2 mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="btn btn-primary btn-sm flex-1"><Plus size={14} /> Add to Library</button>
                    <button className="btn btn-secondary btn-sm btn-icon" title="View details"><ExternalLink size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-serif text-2xl mb-6">Explore Collections</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Psychology & Mind', 'Business & Wealth', 'Philosophy & Meaning', 'Biographies'].map((collection, idx) => (
            <div key={idx} className="card p-6 text-center hover:bg-white/5 cursor-pointer flex flex-col items-center justify-center h-32">
              <h4 className="font-medium text-sm">{collection}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
