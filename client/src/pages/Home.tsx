import React, { useState, useEffect } from 'react';
import { experienceService } from '../services/api';
import { Experience } from '../types';
import ExperienceCard from '../components/ExperienceCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const data = await experienceService.getAll();
      setExperiences(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch experiences');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchExperiences}
              className="mt-4 px-6 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((experience) => (
              <ExperienceCard key={experience._id} experience={experience} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
