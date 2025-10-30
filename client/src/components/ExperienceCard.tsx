import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{experience.title}</h3>
          <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
            {experience.location}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {experience.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">From </span>
            <span className="text-xl font-bold text-gray-900">₹{experience.price}</span>
          </div>
          <button
            onClick={() => navigate(`/experience/${experience._id}`)}
            className="px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
