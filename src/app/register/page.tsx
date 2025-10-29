// app/register/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, CheckCircle, Sparkles, Languages } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import FooterPage from '@/components/layout/Footer';
import { useRouter } from 'next/navigation'; // Correction ici

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Utilisation de useEffect pour calculer la force du mot de passe
  useEffect(() => {
    const checkPasswordStrength = (password: string) => {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      setPasswordStrength(strength);
    };

    if (formData.password) {
      checkPasswordStrength(formData.password);
    } else {
      setPasswordStrength(0);
    }
  }, [formData.password]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
  };

  const getStrengthColor = (strength: number) => {
    const colors = [
      'bg-red-500', 
      'bg-orange-500', 
      'bg-yellow-500', 
      'bg-blue-500', 
      'bg-green-500'
    ];
    return colors[strength - 1] || 'bg-gray-300';
  };

  const getStrengthText = (strength: number) => {
    const texts = [
      'Très faible',
      'Faible',
      'Moyen',
      'Fort',
      'Très fort'
    ];
    return texts[strength - 1] || 'Non évalué';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation supplémentaire
    if (!isFormValid) {
      alert('Veuillez corriger les erreurs dans le formulaire');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('https://lang-courses-api.onrender.com/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log('Inscription réussie');
        alert('Inscription réussie ! Vérifiez vos emails pour confirmer votre compte et vous connecter après.');
        router.push('/login');
      } else if (response.status === 400) {
        const errorData = await response.json();
        alert(`Erreur : ${errorData.message || 'Vérifiez vos informations d\'inscription.'}`);
      } else {
        const error = await response.json();
        console.error('Erreur d\'inscription:', error);
        alert('Une erreur est survenue lors de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      alert('Erreur de connexion. Vérifiez votre connexion internet.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = passwordStrength >= 3 && 
                      formData.password === formData.password2 && 
                      formData.username.trim() !== '' && 
                      formData.email.trim() !== '';
  return (
    <main>
      <Navbar/>
      <br /> <br />
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
          
          {/* Section de bienvenue - Côté gauche */}
          <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12 flex flex-col justify-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Languages className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-bold">LangCourses</h1>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-6 w-6 text-yellow-300" />
                  <h2 className="text-4xl font-bold">Commencez votre voyage !</h2>
                </div>
                <p className="text-indigo-100 text-lg leading-relaxed">
                  Rejoignez notre communauté d'apprenants en langues. 
                  Accédez à des cours personnalisés, suivez votre progression 
                  et maîtrisez de nouvelles langues à votre rythme.
                </p>
              </div>

              <div className="space-y-6 pt-8">
                {/* Avantages */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-indigo-100">Cours personnalisés</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-indigo-100">Suivi de progression détaillé</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-indigo-100">Communauté internationale</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-indigo-100">Apprentissage à votre rythme</span>
                  </div>
                </div>

                {/* Lien vers login */}
                <div className="text-center pt-4">
                  <p className="text-indigo-200">
                    Déjà membre ?{' '}
                    <Link 
                      href="/login" 
                      className="text-white font-semibold hover:text-yellow-200 transition-colors duration-300 inline-flex items-center space-x-1"
                    >
                      <span>Se connecter</span>
                      <span>→</span>
                    </Link>
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <p className="text-indigo-200 text-sm">
                  "Les limites de ma langue sont les limites de mon monde."<br />
                  <span className="italic">- Ludwig Wittgenstein</span>
                </p>
              </div>
            </div>
          </div>

          {/* Section formulaire - Côté droit */}
          <div className="lg:w-1/2 p-12 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Créer un compte</h2>
              <p className="text-gray-700">Rejoignez notre communauté d'apprenants</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username Field */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                  Nom d'utilisateur
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                    placeholder="Votre nom d'utilisateur"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Adresse email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Mot de passe
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                    placeholder="Votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Force du mot de passe</span>
                      <span className={`text-sm font-semibold ${
                        passwordStrength <= 2 ? 'text-red-600' :
                        passwordStrength === 3 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {getStrengthText(passwordStrength)}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                            level <= passwordStrength 
                              ? getStrengthColor(passwordStrength) 
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Le mot de passe doit contenir au moins 8 caractères, une majuscule, 
                      une minuscule, un chiffre et un caractère spécial.
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="password2" className="block text-sm font-semibold text-gray-700">
                  Confirmer le mot de passe
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    id="password2"
                    name="password2"
                    type="password"
                    required
                    value={formData.password2}
                    onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                    placeholder="Confirmez votre mot de passe"
                  />
                </div>
                {formData.password2 && formData.password !== formData.password2 && (
                  <p className="text-sm text-red-600 font-medium mt-2 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>Les mots de passe ne correspondent pas</span>
                  </p>
                )}
                {formData.password2 && formData.password === formData.password2 && passwordStrength >= 3 && (
                  <p className="text-sm text-green-600 font-medium mt-2 flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>Les mots de passe correspondent</span>
                  </p>
                )}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <UserPlus className="h-5 w-5" />
                <span className="font-semibold">
                  {isLoading ? 'Création du compte...' : 'Créer mon compte'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <FooterPage/>
    </main>
  );
}