// /components/Certificate.tsx
'use client';

import { FC, useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getMention } from "../../utils/grade";
import { motion } from "framer-motion";
import { useAuth } from "@/app/contexts/AuthContext";

type Props = {
  score: number;
  total: number;
  userName?: string;
  courseName?: string;
};

const Certificate: FC<Props> = ({ 
  score, 
  total, 
  userName: propUserName,
  courseName = "English Online Course"
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [finalUserName, setFinalUserName] = useState("Participant");
  const { user, isAuthenticated} = useAuth();
  
  const percentage = Math.round((score / total) * 100);
  const mention = getMention(score, total);
  const date = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Chemin vers l'image QR Code
  const qrCodeImage = "/img/qrcode.png";

  // Déterminer le nom d'utilisateur avec priorité
  useEffect(() => {
    if (propUserName && propUserName !== "Participant") {
      setFinalUserName(propUserName);
    } else if (user?.username) {
      setFinalUserName(user.username);
    } else if (user?.email) {
      // Utiliser le nom avant l'@ dans l'email comme fallback
      const nameFromEmail = user.email.split('@')[0];
      setFinalUserName(nameFromEmail);
    } else if (isAuthenticated) {
      setFinalUserName("Utilisateur");
    } else {
      setFinalUserName("Participant");
    }
  }, [user, isAuthenticated, propUserName]);

  const getCertificateFileName = () => {
    const cleanName = finalUserName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
      .replace(/[^a-zA-Z0-9\s-]/g, "") // Supprimer les caractères spéciaux
      .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
      .toLowerCase();
    
    return `certificat-${cleanName}-${date.replace(/\s+/g, '-')}`;
  };

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    setIsGeneratingPDF(true);
    
    try {
      // Créer une copie du certificat sans les icônes pour le PDF
      const certificateClone = certificateRef.current.cloneNode(true) as HTMLElement;
      
      // Supprimer les icônes emoji et éléments interactifs
      const interactiveElements = certificateClone.querySelectorAll('button, [onclick], .print-hidden');
      interactiveElements.forEach(el => el.remove());

      // Supprimer les icônes emoji
      const emojiElements = certificateClone.querySelectorAll('span, div');
      emojiElements.forEach(el => {
        if (el.textContent?.match(/[🎉🏆📄🔄🎯💡👍🙂😢🌟🟡]/)) {
          el.remove();
        }
      });

      // Supprimer les animations Framer Motion
      const motionElements = certificateClone.querySelectorAll('[style*="transform"]');
      motionElements.forEach(el => {
        el.removeAttribute('style');
      });

      // Ajouter des styles spécifiques pour l'impression
      certificateClone.style.fontFamily = "'Times New Roman', serif";
      certificateClone.querySelectorAll('*').forEach(el => {
        (el as HTMLElement).style.fontFamily = "'Times New Roman', serif";
      });

      // Ajouter la copie modifiée temporairement au DOM
      certificateClone.style.position = 'fixed';
      certificateClone.style.left = '-9999px';
      certificateClone.style.top = '0';
      certificateClone.style.width = '794px';
      certificateClone.style.height = '1123px';
      certificateClone.style.background = 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fdba74 100%)';
      certificateClone.style.zIndex = '9999';
      document.body.appendChild(certificateClone);

      // Attendre que les images soient chargées
      await new Promise(resolve => setTimeout(resolve, 500));

      // Capturer le certificat modifié
      const canvas = await html2canvas(certificateClone, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
        width: 794,
        height: 1123,
        onclone: (clonedDoc) => {
          // S'assurer que le QR code est visible dans le clone
          const qrImg = clonedDoc.querySelector('img[alt*="QR Code"]') as HTMLImageElement;
          if (qrImg) {
            qrImg.style.display = 'block';
          }
        }
      });

      // Nettoyer
      document.body.removeChild(certificateClone);

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Création du PDF en format A4 portrait
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Ajouter l'image du certificat en plein page
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');
      
      // Métadonnées du PDF avec le nom réel de l'utilisateur
      pdf.setProperties({
        title: `Certificat - ${finalUserName}`,
        subject: `Certificat de réussite - ${courseName}`,
        author: 'Plateforme Éducative',
        keywords: 'certificat, réussite, formation, diplôme',
        creator: 'Quiz Application'
      });

      pdf.save(`${getCertificateFileName()}.pdf`);
      
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      
      // Fallback : PDF stylisé avec jsPDF uniquement
      await generateStyledPDF();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const generateStyledPDF = async () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Fond de page
    pdf.setFillColor(254, 243, 199);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Bordure décorative
    pdf.setDrawColor(253, 186, 116);
    pdf.setLineWidth(3);
    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20, 'D');

    // En-tête
    pdf.setFontSize(24);
    pdf.setTextColor(180, 83, 9);
    pdf.setFont('helvetica', 'bold');
    pdf.text("CERTIFICAT D'EXCELLENCE", pageWidth / 2, 40, { align: 'center' });

    // Ligne de séparation
    pdf.setDrawColor(180, 83, 9);
    pdf.setLineWidth(1);
    pdf.line(30, 50, pageWidth - 30, 50);

    // Texte d'introduction
    pdf.setFontSize(14);
    pdf.setTextColor(30, 41, 59);
    pdf.text("Ce certificat est décerné à", pageWidth / 2, 70, { align: 'center' });

    // Nom du participant
    pdf.setFontSize(20);
    pdf.setTextColor(180, 83, 9);
    pdf.setFont('helvetica', 'bold');
    pdf.text(finalUserName.toUpperCase(), pageWidth / 2, 90, { align: 'center' });

    // Cours
    pdf.setFontSize(12);
    pdf.setTextColor(30, 41, 59);
    pdf.setFont('helvetica', 'normal');
    pdf.text("pour avoir complété avec succès le cours", pageWidth / 2, 110, { align: 'center' });
    
    pdf.setFontSize(16);
    pdf.setTextColor(217, 119, 6);
    pdf.setFont('helvetica', 'bold');
    pdf.text(courseName, pageWidth / 2, 125, { align: 'center' });

    // MENTION SEULEMENT en grand
    const mentionY = 160;
    pdf.setFontSize(28);
    pdf.setTextColor(180, 83, 9);
    pdf.setFont('helvetica', 'bold');
    pdf.text(mention.toUpperCase(), pageWidth / 2, mentionY, { align: 'center' });

    // QR Code
    try {
      const qrCodeData = await loadImageData(qrCodeImage);
      if (qrCodeData) {
        const qrCodeX = pageWidth - 60;
        const qrCodeY = pageHeight - 80;
        const qrCodeSize = 30;
        
        pdf.addImage(qrCodeData, 'PNG', qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);
        
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text("Code de vérification", qrCodeX + qrCodeSize / 2, qrCodeY + qrCodeSize + 5, { align: 'center' });
      }
    } catch (error) {
      console.log("QR Code non disponible pour le PDF");
    }

    // Message de félicitations
    pdf.setFontSize(16);
    pdf.setTextColor(180, 83, 9);
    pdf.setFont('helvetica', 'bold');
    pdf.text("Félicitations pour votre excellent travail !", pageWidth / 2, 200, { align: 'center' });

    // Pied de page
    const footerY = pageHeight - 30;
    
    pdf.setFontSize(10);
    pdf.setTextColor(30, 41, 59);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Délivré le : ${date}`, 30, footerY);

    // Numéro de certificat avec référence utilisateur
    const certificateId = `CERT-${Date.now().toString().slice(-8)}`;
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(`N° ${certificateId}`, pageWidth / 2, footerY + 15, { align: 'center' });

    pdf.save(`${getCertificateFileName()}.pdf`);
  };

  const loadImageData = (src: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
    });
  };

  const handleShare = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null
      });

      canvas.toBlob(async (blob) => {
        if (blob) {
          const fileName = `certificat-${finalUserName.replace(/\s+/g, '-')}.png`;
          const file = new File([blob], fileName, { type: 'image/png' });
          
          if (navigator.share && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: `Mon certificat - ${courseName}`,
              text: `J'ai obtenu la mention ${mention} sur ${courseName} !`
            });
          } else {
            // Fallback pour le téléchargement
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(url);
          }
        }
      });
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Indicateur du nom d'utilisateur utilisé */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <p className="text-white/70 text-sm">
            Certificat délivré à : <span className="text-amber-300 font-semibold">{finalUserName}</span>
            {user?.username && (
              <span className="text-green-400 ml-2">✓ Authentifié</span>
            )}
          </p>
        </motion.div>

        {/* Certificat */}
        <div 
          ref={certificateRef}
          className="relative bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 rounded-3xl shadow-2xl border-8 border-amber-200 overflow-hidden mb-8 certificate-print"
          style={{ minHeight: '1123px' }}
        >
          {/* Effets décoratifs */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZGI0NDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
          
          {/* Bordure ornée */}
          <div className="absolute inset-4 border-2 border-amber-400 rounded-2xl pointer-events-none"></div>
          
          <div className="relative p-8 md:p-12 h-full flex flex-col justify-between">
            {/* En-tête */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🏆</span>
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4"
              >
                CERTIFICAT D'EXCELLENCE
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 italic"
              >
                Ce certificat est décerné à
              </motion.p>
            </div>

            {/* Corps du certificat */}
            <div className="text-center mb-8 flex-grow">
              <motion.h2
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 border-b-2 border-amber-300 pb-4 inline-block"
              >
                {finalUserName}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl text-gray-700 mb-4"
              >
                pour avoir complété avec succès le cours
              </motion.p>
              
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-2xl font-semibold text-amber-600 mb-8"
              >
                {courseName}
              </motion.h3>

              {/* MENTION SEULEMENT en grand */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="my-12"
              >
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  {mention}
                </h1>
              </motion.div>
            </div>

            {/* Pied de page */}
            <div className="flex flex-col md:flex-row justify-between items-center border-t border-amber-300 pt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-center md:text-left mb-4 md:mb-0"
              >
                <div className="text-sm text-gray-500">Date d'obtention</div>
                <div className="font-semibold text-gray-700">{date}</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="flex items-center space-x-4"
              >
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">Code de vérification</div>
                  <div className="w-20 h-20 border-2 border-amber-300 rounded-lg bg-white flex items-center justify-center overflow-hidden shadow-lg">
                    <img 
                      src={qrCodeImage}
                      alt="QR Code de vérification du certificat"
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center text-xs text-center text-gray-500">
                            QR Code<br/>Non disponible
                          </div>
                        `;
                      }}
                    />
                  </div>
                </div>
              </motion.div>
              
              {/* Espace vide à droite */}
              <div className="w-32"></div>
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={handleDownload}
            disabled={isGeneratingPDF}
            whileHover={{ scale: isGeneratingPDF ? 1 : 1.05 }}
            whileTap={{ scale: isGeneratingPDF ? 1 : 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPDF ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Génération du PDF...</span>
              </>
            ) : (
              <>
                <span className="text-lg">📄</span>
                <span>Télécharger A4</span>
              </>
            )}
          </motion.button>
          
        </motion.div>

        {/* Message de félicitations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-center mt-8"
        >
          <p className="text-lg text-white/80">
            Félicitations pour votre excellent travail ! 🎉
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Certificate;