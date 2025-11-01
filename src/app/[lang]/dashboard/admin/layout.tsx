// import "../admin/global.css";
// import { ThemeProvider } from "../admin/composants/lib/ThemeProvider";

// export const metadata = {
//   title: "Dashboard Demo",
//   description: "Dashboard replicating the provided design",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="fr">
//       <body>
//         <ThemeProvider>
//           {children}
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

// ✅ src/app/[lang]/layout.tsx
export default function LangLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lang-layout">
      {children}
    </div>
  );
}
