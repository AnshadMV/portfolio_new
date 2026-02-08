
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillGroup {
  category: string;
  skills: string[];
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent {
  summary = 'I specialize in building high-performance web applications and scalable backend systems. With a strong foundation in .NET Core and modern frontend frameworks like Angular and React, I bridge the gap between complex business logic and intuitive user experiences. My focus is always on clean code, maintainability, and user-centric design.';

  skillGroups: SkillGroup[] = [
    {
      category: 'Core Stack',
      skills: ['.NET Core', 'C#', 'SQL Server', 'Entity Framework']
    },
    {
      category: 'Frontend',
      skills: ['Angular', 'TypeScript', 'Tailwind CSS', 'RxJS', 'NgRx']
    },
    {
      category: 'Data & Cloud',
      skills: ['Azure', 'Docker', 'Kubernetes', 'Redis', 'CosmosDB']
    },
    {
      category: 'DevOps & Tools',
      skills: ['Git', 'Azure DevOps', 'CI/CD', 'Jest', 'Postman']
    }
  ];
}
