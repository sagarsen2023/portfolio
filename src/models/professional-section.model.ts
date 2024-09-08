export interface ProfessionalBackgroundSectionInterface {
  title: string;
  description: string;
  education: EducationInterface[];
  experience: ExperienceInterface[];
}

export interface EducationInterface {
  degree: string;
  institute: string;
  duration: string;
}

export interface ExperienceInterface {
  title: string;
  company: string;
  duration: string;
  description: string;
}
