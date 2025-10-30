import { Request, Response } from 'express';
import Experience from '../models/Experience';

export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find().select('-__v');
    res.json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching experiences',
      error: error.message
    });
  }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findById(id).select('-__v');
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    res.json({
      success: true,
      data: experience
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching experience',
      error: error.message
    });
  }
};
