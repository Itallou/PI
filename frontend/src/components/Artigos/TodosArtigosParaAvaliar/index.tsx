'use client';

import { CiFilter } from 'react-icons/ci';
import { FaRegStar } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { GoDownload } from 'react-icons/go';
import { IoSearchOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

import filesData from './files.json';

export default function TodosOsArtigosParaAvaliar() {
	const changeColor = (text: string) => {
		if (text == 'Não Possui Avaliador' || text == "Recusado") {
			return '#B9012D';
		} else if (text == 'Reenvio Aprovado') {
			return '#267700';
		} else if (text == 'Não Finalizado' || text == 'Em Andamento') {
			return '#000000';
		} else if (text == 'Aprovado') {
			return '#15A912';
		} else {
			return '#00000';
		}
	};

const verifyAvaliation = (text:string) => {
    if(text == "Não Finalizado" || text == "Em Andamento"){
        return '1'
    } else {
        return '0.5'
    }
}

const verifyAvaliationCursor = (text:string) => {
    if(text == "Não Finalizado" || text == "Em Andamento"){
        return 'pointer'
    } else {
        return 'default'
    }
}

const viewAvaliation = (text:string) => {
    if(text == "Aprovado" || text == "Reenvio Aprovado" || text == "Recusado"){
        return '1'
    } else {
        return '0.5'
    }
}

const viweAvaliationCursor = (text:string) => {
    if(text == "Aprovado" || text == "Reenvio Aprovado" || text == "Recusado"){
        return 'pointer'
    } else {
        return 'default'
    }
}

	return (
		<div className="container mb-6 mt-40 flex justify-center">
			<div className="flex w-4/5 flex-col items-center">
				<h1
					className="text-center text-2xl font-bold text-black"
					style={{ color: '#ef0037' }}
				>
					Arquivos
				</h1>
				<h2 className="text-center" style={{ color: '#000000' }}>
					Todos os arquivos enviados
				</h2>

				<div className="absolute mt-14 flex w-8/12 flex-col items-end gap-2">
					<div className="flex cursor-pointer gap-3">
						<p className="text-lg font-medium">Buscar</p>
						<IoSearchOutline size={30} />
					</div>
					<div className="flex cursor-pointer gap-5">
						<p className="text-lg font-medium">Filtrar</p>
						<CiFilter size={30} />
					</div>
				</div>

				{filesData && (
					<>
						{filesData.map((event, index) => {
							return (
								<div key={index} className="ml-10 mt-16 w-full">
									<div className="mb-5 flex gap-1 text-lg font-bold">
										<h1 className="text-[#EF0037]">Evento:</h1>
										<h1>{event.event_title}</h1>
									</div>
									{event.arquivos.map((files, index) => {
										return (
											<div
												key={index}
												className="mb-5 ml-[2rem] flex w-full flex-col p-1"
											>
												<div className="flex w-11/12 justify-between rounded-lg border border-[#EF0037] p-5 shadow-lg">
													<div className="flex flex-col gap-2">
														<p className="mb-2 text-lg text-[#EF0037]">
															{files.file_title}
														</p>

														<div className="ml-4 flex w-full flex-col gap-4">
															<div className="flex gap-1">
																<div>
																	<p className="text-nowrap font-bold">
																		Status:
																	</p>
																</div>
																<p
																	style={{
																		color: files.status
																			? changeColor(files.status)
																			: '#0000',
																		fontWeight: '700',
																		borderBottom: `1px solid ${changeColor(
																			files.status
																		)}`,
																	}}
																>
																	{files.status}
																</p>
															</div>

															<div className="flex gap-1">
																<div>
																	<p className="text-nowrap font-bold">
																		Tipo de Arquivo:
																	</p>
																</div>
																<p>{files.tipo_arquivo}</p>
															</div>

															<div className="flex gap-1">
																<div>
																	<p className="text-nowrap font-bold">
																		Área do Arquivo:
																	</p>
																</div>
																<p>{files.area_arquivo}</p>
															</div>

															<div className="flex gap-1">
																<div>
																	<p className="text-nowrap font-bold">
																		Autores:
																	</p>
																</div>
																<p>{files.autores}</p>
															</div>

															<div className="flex gap-1">
																<div>
																	<p className="text-nowrap font-bold">
																		Avaliadores:
																	</p>
																</div>
																<p>{files.avaliadores}</p>
															</div>
														</div>
													</div>

													<div className='w-3/12 p-2 flex flex-col gap-3'>
														<div className='flex gap-2 justify-around '>
															<div className='border-2 border-black rounded-full w-1/5 justify-center items-center flex cursor-pointer'>
																<MdOutlineRemoveRedEye size={23}/>
															</div>
															<div className='flex gap-1 border-2 border-[#C0002F] text-[#C0002F] w-8/12 rounded-xl p-1' style={{opacity: files.status ? verifyAvaliation(files.status) : '0.5', cursor:  files.status ? verifyAvaliationCursor(files.status) : 'default'}}>
                                                                <p>Mudar Avaliador</p>
																<FiEdit size={20} />
															</div>
														</div>

														<div>
                                                        <div className='flex gap-2 justify-around '>
															<div className='border-2 border-[#4B00E0] text-[#4B00E0] rounded-full w-1/5 justify-center items-center flex cursor-pointer'>
																<GoDownload size={23}/>
															</div>
															<div className='flex gap-1 border-2 border-[#00B7FF] w-[65%] text-black rounded-xl p-1 justify-around' style={{opacity: files.status ? viewAvaliation(files.status) : '0.5', cursor:  files.status ? viweAvaliationCursor(files.status) : 'default'}}>
                                                                <p>Ver Avaliação</p>
																<FaRegStar size={20} />
															</div>
														</div>
                                                        </div>

                                                        {files.status == 'Não Possui Avaliador' ? (

                                                        <div className='w-full bg-[#0391C9] rounded-xl p-2 flex justify-center items-center gap-4 text-white cursor-pointer'>
                                                            <div className='flex flex-col justify-center align-center'>
                                                            <p className=''>Encaminhar</p>
                                                            <p className='text-center'>Avaliador</p>
                                                            </div>
                                                            <FaRegStar size={27} />
                                                        </div>
                                                        ) : ''}

													</div>

												</div>
											</div>
										);
									})}
								</div>
							);
						})}
					</>
				)}
                				<div className="bottom-5 left-1/2 mt-12 flex w-[340px] -translate-x-6 justify-center space-x-3 rtl:space-x-reverse">
					<button
						type="button"
						className="group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
						data-carousel-prev
					>
						<span className="inline-flex items-center justify-center bg-white/30">
							<svg
								className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 1 1 5l4 4"
								/>
							</svg>
							<span className="sr-only">Previous</span>
						</span>
					</button>
					<button
						type="button"
						className="h-1 w-10 rounded-lg bg-slate-400 shadow-lg hover:bg-slate-600 active:bg-slate-600"
						aria-current="true"
						aria-label="Slide 1"
						data-carousel-slide-to="0"
					></button>
					<button
						type="button"
						className="h-1 w-10 rounded-lg bg-slate-400 shadow-lg hover:bg-slate-600"
						aria-current="false"
						aria-label="Slide 2"
						data-carousel-slide-to="1"
					></button>
					<button
						type="button"
						className="h-1 w-10 rounded-lg bg-slate-400 shadow-lg hover:bg-slate-600"
						aria-current="false"
						aria-label="Slide 3"
						data-carousel-slide-to="2"
					></button>
					<button
						type="button"
						className="h-1 w-10 rounded-lg bg-slate-400 shadow-lg hover:bg-slate-600"
						aria-current="false"
						aria-label="Slide 4"
						data-carousel-slide-to="3"
					></button>

					<button
						type="button"
						className="group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
						data-carousel-next
					>
						<span className="inline-flex items-center justify-center bg-white/30">
							<svg
								className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m1 9 4-4-4-4"
								/>
							</svg>
							<span className="sr-only">Next</span>
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
