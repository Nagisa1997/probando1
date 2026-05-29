import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login'); // O '/dashboard', según a donde quieras mandar a la gente
}