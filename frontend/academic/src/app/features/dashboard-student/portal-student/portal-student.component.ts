import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { AuthService } from '@services/auth.service';

interface Language {
  language: string;
  level: string;
}

interface UserProfile {
  basicInfo: {
    displayName: string;
    avatar: string;
    coverPhoto: string;
    biography: string;
  };
  contactInfo: {
    email: {
      personal: string;
      institutional: string;
    };
    phone: string;
  };
  location: {
    city: string;
    country: string;
  };
  languages: Language[];
}

@Component({
  selector: 'app-portal-student',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    AvatarModule,
    TabViewModule,
    TagModule,
    DividerModule
  ],
  templateUrl: './portal-student.component.html',
  styleUrl: './portal-student.component.scss',
})
export default class PortalStudentComponent implements OnInit {
  profile: UserProfile = {
    basicInfo: {
      displayName: 'N/A',
      avatar: 'assets/images/default-avatar.png',
      coverPhoto: 'assets/images/default-cover.jpg',
      biography: 'N/A',
    },
    contactInfo: {
      email: {
        personal: 'N/A',
        institutional: 'N/A',
      },
      phone: 'N/A',
    },
    location: {
      city: 'N/A',
      country: 'N/A',
    },
    languages: [],
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  private loadUserProfile() {
    const user = this.authService.authUser.value;
    if (user) {
      this.profile = {
        basicInfo: {
          displayName: `${user.nombre} ${user.apellido}`,
          avatar: '../../../../assets/images/profile.jpeg',
          coverPhoto: '../../../../assets/images/portada.jpeg',
          biography: 'Sin biografía',
        },
        contactInfo: {
          email: {
            personal: user.email,
            institutional: `${user.email.split('@')[0]}@universidad.edu.co`,
          },
          phone: 'N/A',
        },
        location: {
          city: 'N/A',
          country: 'Colombia',
        },
        languages: [{ language: 'Español', level: 'Nativo' }],
      };
    }
  }

  getLanguageSeverity(
    level: string
  ):
    | 'success'
    | 'secondary'
    | 'info'
    | 'warning'
    | 'danger'
    | 'contrast'
    | undefined {
    switch (level) {
      case 'Fluent':
        return 'success';

      case 'Intermediate':
        return 'info';

      case 'Basic':
        return 'warning';

      default:
        return 'contrast';
    }
  }
}
