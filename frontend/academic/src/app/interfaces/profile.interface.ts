export interface Profile {
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
  languages: Array<{
    language: string;
    level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Nativo';
  }>;
}
