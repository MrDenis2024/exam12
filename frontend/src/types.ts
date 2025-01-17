export interface User {
  _id: string;
  email: string;
  displayName: string;
  token: string;
  role: string;
  googleId?: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}


export interface Photo {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  }
  title: string;
  photo: string;
}

export interface UserPhoto {
  user: {
    _id: string;
    displayName: string;
  }
  photos: Photo[];
}

export interface PhotoMutation {
  title: string;
  photo: File | null;
}


