'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import axios from 'axios';
import { toNumber } from 'lodash';

import { Event } from '@/lib/repository/event/index.repository';
import { Sessao } from '@/lib/repository/sessao/index.repository';

export default function SessaoForm() {
	const router = useRouter();
	const [tempoSessao, setTempoSessao] = useState('');
	// const [periodoEvent, setPeriodoEvenet] = useState(JSON.parse(localStorage.getItem('event') || '{}'))
	const [sessoes, setSessoes] = useState<Sessao[]>([]);

	const handleAddOnTable = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data: Event = JSON.parse(localStorage.getItem('event') || '{}');
		if (data) {
			data.dataFinal;
		}
		// 			const dataInicio = response.data.event.dataInicio
		// 			const horarioInicio = response.data.event.horarioInicio
		// 			const dataFim = response.data.event.dataFinal
		// 			const horarioFinal = response.data.event.horarioFim
		// 			const momentDateHourIni = moment(dataInicio+ ' ' + horarioInicio);
		// 			const momentDateHourFin = moment(dataFim+ ' ' + horarioFinal);
		// 			const hours = momentDateHourIni.hour() - momentDateHourFin.hour();
		// 			const salas : Sala[] = response.data.event.Sala
		setSessoes((prev) => [
			...prev,
			{
				horario: toNumber('12'),
				tempoApresentacao: toNumber('14'),
				tempoSessao: toNumber('32'),
				comissaoId: 'laurins',
			},
			{
				horario: toNumber('10'),
				tempoApresentacao: toNumber('14'),
				tempoSessao: toNumber('32'),
				comissaoId: 'marcio',
			},
			{
				horario: toNumber('14'),
				tempoApresentacao: toNumber('14'),
				tempoSessao: toNumber('32'),
				comissaoId: 'julia martins',
			},
		]);
	};
	// const handleSubmit = async (e: { preventDefault: () => void; }) => {
	// 	e.preventDefault();
	// 	try {
	// 		const response = await axios.post('http://localhost:3001/sessao', {
	// 			tempoSessao: toNumber(tempoSessao),
	// 		});
	// 		console.log(response.data);
			
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const handleNextButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		localStorage.removeItem('event');
		// localStorage.removeItem('eventId');
		localStorage.removeItem('areas');
		router.push('/evento/meus-eventos');
	};

	const findSalaForSession = (horario: number): string => {
		let result = '';
		// const eventId = '5a57554e-fb55-4022-9873-0e67df9ed507';
		// if(eventId){
		// 	try{
		// 		const response = await axios.get(`http://localhost:5002/event/${eventId}`);
		// 		if(response.data){
		// 			const dataInicio = response.data.event.dataInicio
		// 			const horarioInicio = response.data.event.horarioInicio
		// 			const dataFim = response.data.event.dataFinal
		// 			const horarioFinal = response.data.event.horarioFim
		// 			const momentDateHourIni = moment(dataInicio+ ' ' + horarioInicio);
		// 			const momentDateHourFin = moment(dataFim+ ' ' + horarioFinal);
		// 			const hours = momentDateHourIni.hour() - momentDateHourFin.hour();
		// 			const salas : Sala[] = response.data.event.Sala

		// 		}
		// 	}catch(error){
		// 		console.log(error);
		// 	}
		// }
		return result;
	};

	return (
		<div className="container mb-6 mt-52 flex flex-col items-center">
			<div className="w-1/2">
				<h1
					className="text-center text-2xl font-bold text-black"
					style={{ color: '#ef0037' }}
				>
					Sessões
				</h1>
				<h2 className="text-center" style={{ color: '#000000' }}>
					Salas que irão ser utilizadas no evento
				</h2>
			</div>

			<form className="mt-8 flex flex-col" onSubmit={handleAddOnTable}>
				<div className="mb-5 flex flex-col">
					<label className="mb-2 text-sm font-medium" htmlFor="tempoSessao">
						Tempo por Sessão:
					</label>
					<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
						<input
							className="w-full rounded-md border-0 bg-white text-sm outline-none"
							type="time"
							name="tempoSessao"
							id="tempoSessao"
							value={tempoSessao}
							onChange={(e) => setTempoSessao(e.target.value)}
							required
						/>
					</div>
				</div>

				{/* <div className="mb-5 flex flex-col">
					<label
						className="mb-2 w-80 text-sm font-medium"
						htmlFor="tempoApresentacao"
					>
						Tempo por Apresentação:
					</label>
					<div className="rounded-md border border-gray-300 bg-white px-4 py-2">
						<input
							className="w-full rounded-md border-0 bg-white text-sm outline-none"
							type="time"
							name="tempoApresentacao"
							id="tempoApresentacao"
							required
						/>
					</div>
				</div> */}

				<button
					className="h-12 w-52
                    rounded-xl border-2 border-solid  border-black bg-transparent p-2 text-center text-base font-medium text-black"
					type="submit"
				>
					Distribuir
				</button>
			</form>

			<div className="mt-8 flex items-center justify-center gap-6">
				<button
					className="w-56
                    rounded-xl border-none p-2 text-center text-base font-medium text-white"
					style={{ backgroundColor: '#8A8A8A' }}
					type="submit"
				>
					Voltar
				</button>
				<button
					className="w-56
                    rounded-xl border-none p-2 text-center text-base font-medium text-white"
					style={{ backgroundColor: '#EF0037' }}
					type="submit"
					onClick={handleNextButtonClick}
				>
					Finalizar
				</button>
			</div>

			<div className="mt-14 flex w-2/3 flex-col">
				<h1 className="text-start text-2xl font-bold text-black">
					Gerenciamento das sessões
				</h1>
			</div>

			<table className="mt-12 w-2/3 text-center">
				<thead style={{ backgroundColor: '#E4E4E4' }}>
					<tr className="h-14">
						<th scope="col">Sessão</th>
						<th scope="col" className="">
							Sala
						</th>
						<th scope="col" className="">
							Horário
						</th>
						<th scope="col" className="">
							Chair
						</th>
						<th scope="col" className="">
							Ações
						</th>
					</tr>
				</thead>
				<tbody>
					{sessoes && (
						<>
							{sessoes.map((sala, index) => {
								return (
									<tr
										key={index}
										className="h-14"
										style={{
											backgroundColor: !(index % 2 === 0) ? '#E4E4E4' : '#fff',
										}}
									>
										<td scope="row" className="">
											{index}
										</td>
										<td>{543 + index}</td>
										<td className="">{`${sala.horario} até ${
											sala.horario + 2
										}`}</td>
										<td className="">{sala.comissaoId}</td>
										<td className="">
											<button className="rounded-xl border-2 border-solid  border-black bg-transparent p-2 text-center text-sm text-black">
												Ver mais
											</button>
										</td>
									</tr>
								);
							})}
						</>
					)}
					{/* <tr className="h-20">
						<td scope="row" className="">
							01
						</td>
						<td className="">01</td>
						<td className="">
							<h1 className="text-xs">Artigo 1</h1>
							<h1 className="text-xs">Artigo 2</h1>
							<h1 className="text-xs">Artigo 3</h1>
						</td>
						<td className="">13:30 até 14:30</td>
						<td className="">Heitor Golsavez</td>
						<td className="">
							<button className="rounded-xl border-2 border-solid  border-black bg-transparent p-2 text-center text-sm text-black">
								Ver mais
							</button>
						</td>
					</tr>
					<tr className="h-20" style={{ backgroundColor: '#E4E4E4' }}>
						<td scope="row" className="">
							02
						</td>
						<td className="">02</td>
						<td className="">
							<h1 className="text-xs">Artigo 1</h1>
							<h1 className="text-xs">Artigo 2</h1>
							<h1 className="text-xs">Artigo 3</h1>
						</td>
						<td className="">13:30 até 14:30</td>
						<td className="">Heitor Golsavez</td>
						<td className="">
							<button className="rounded-xl border-2 border-solid  border-black bg-transparent p-2 text-center text-sm text-black">
								Ver mais
							</button>
						</td>
					</tr> */}
				</tbody>
			</table>
		</div>
	);
}
