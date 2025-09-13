import "./globals.css";
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.min.css';                 
import 'primeicons/primeicons.css';  
import Navbar from "./components/navbar/page";


export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <body >
        {/* Navbar */}
        <div style={{display:'flex'}}>
          <Navbar/>  
        </div>
        <main style={{flex:1, padding:'1 rem'}}>
        {children}
        </main>
      </body>
    </html>
  );
}