import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export const metadata = { title: 'Wendy Huang — Software Engineer & Traveler', description: 'Personal site and travel writing by Wendy Huang.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <><Header/><main>{children}</main><Footer/></>}
