import Footer from '@/components/COMPONENTES/Footer';
import Navbar from '@/components/COMPONENTES/Navbar';

export default async function Support() {
	return (
		<div className='h-screen flex flex-col justify-items-center '>
			<Navbar />
			<div className='h-full flex justify-center items-center'>
                <h1>Support Page</h1>
            </div>
			<Footer />
		</div>
	);
}
