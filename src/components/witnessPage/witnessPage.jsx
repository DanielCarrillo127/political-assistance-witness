import React, { useState, useEffect, useContext } from 'react' //useContext
import { toast } from "react-toastify";
import { DataContext } from '../../context/userContext';
import { Dropdown } from 'rsuite';
import './witnessPage.css';
import RecordCard from './recordCard/recordCard';
import RecordModal from './recordModal/recordModal';
import Cards from '../../components/cardsHighlights/cards';
import { HiOutlineClipboardCheck, HiOutlineDocumentAdd, HiOutlineDocumentRemove, HiOutlineDocumentSearch, HiOutlineFlag, HiOutlineMinusCircle, HiOutlineXCircle } from "react-icons/hi";
import { getVotesApi, updateVoteStatusApi, getComplianceReportApi, getMissingTablesReportApi, getGeneralReportApi } from '../../api/requestRegisterVote.js';
import { imageDb } from '../../api/firebaseConfig';
import downloadAndZipImages from '../../utils/downloadImages';
import { ref, listAll } from "firebase/storage";
import PageIcon from '@rsuite/icons/Page';
import DetailIcon from '@rsuite/icons/Detail';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import ExportToXlsx from '../../utils/exportToXlsx';
import { votingBoothPaz } from '../../utils/constant';

const WitnessPage = () => {

    const { user } = useContext(DataContext);
    //handlers to open the different modals
    const [openDetail, setOpenDetail] = useState(false);
    const handleCloseDetail = () => setOpenDetail(false);
    const [detailRecord, setDetailRecord] = useState(null);
    const [stats, setStats] = useState(null);

    const [data, setData] = useState([]);

    const fetchData = async () => {
        const req = await getVotesApi({ status: ['PENDIENTE', 'RECHAZADA'] }); //'APROBADO',
        if (req.status === 200) {

            setData(req.data.votes)
            setStats({
                countStatus: req.data.countStatus, totalvotesPrincipal: req.data.totalvotesPrincipal, totalNullVotes: req.data.totalNullVotes, totalWhiteVotes: req.data.totalWhiteVotes, totalUnmarkedVotes: req.data.totalUnmarkedVotes
            })
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(() => {
            fetchData();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const handleExportGeneralReport = async () => {
        // handleExportEvidence();
        const req = await getGeneralReportApi(user.cedula);
        if (req.status === 200) {
            const dataExport = req.data;
            const columns = Object.entries(dataExport[0]).map((header) => {
                return Object.assign({}, {key: header[0], label: header[0] }) 
            })
            console.log(columns)
            ExportToXlsx('Reporte_General', dataExport, columns)
        } else {
            toast.warn(`Error al obtener el reporte`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }
    const handleExportEvidence = async () => {
        const items = await listAll(ref(imageDb, "/"))
        downloadAndZipImages(items)
    }
    const handleExportComplienceReport = async () => {
        const req = await getComplianceReportApi(user.cedula);
        if (req.status === 200) {
            const dataExport = req.data;
            const columns = Object.entries(dataExport[0]).map((header) => {
                return Object.assign({}, { key: header[0], label: header[0] })
            })
            ExportToXlsx('Reporte_Cumplimiento', dataExport, columns)
        } else {
            toast.warn(`Error al obtener el reporte`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }
    const handleExportMissingTablesReport = async () => {

        const votingBoothOptions = votingBoothPaz.map((place, index) => {
            return Object.assign({}, { key: index, puesto: place?.puesto, mesas: place?.mesas, })
        })

        const req = await getMissingTablesReportApi(user.cedula, votingBoothOptions);
        if (req.status === 200) {
            const dataExport = req.data;
            const columns = Object.entries(dataExport[0]).map((header) => {
                return Object.assign({}, { key: header[0], label: header[0] })
            })
            ExportToXlsx('Reporte_Mesas_Faltantes', dataExport, columns)
        } else {
            toast.warn(`Error al obtener el reporte`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const handleSuccess = async (id) => {
        const req = await updateVoteStatusApi({ newStatus: 'APROBADO', voteId: id });
        if (req.status === 200) {
            setData((current) =>
                current.filter(
                    (card) =>
                        card.id !== id
                )
            );
            toast.info(`Registro Aprobado correctamente.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }
    const handleDecline = async (id) => {
        const req = await updateVoteStatusApi({ newStatus: 'RECHAZADA', voteId: id });
        if (req.status === 200) {
            setData((current) =>
                current.filter(
                    (card) =>
                        card.id !== id
                )
            );
            toast.info(`Registro Rechazado correctamente.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }

    }
    const handleOpenDetail = (id) => {
        const foundRecord = data.find((record) => record.id === id)
        setDetailRecord(foundRecord)
        setOpenDetail(true)
    }

    return (
        <div>
            <div>
                <div className="page__grid">
                    <div className="container__component">
                        <div className="container__header">
                            <h2>Bandeja de verificación de votos</h2>

                            <Dropdown icon={<PageIcon />} title="Reportes">
                                <Dropdown.Item icon={<FileDownloadIcon />} onClick={handleExportGeneralReport}>Reporte general</Dropdown.Item>
                                <Dropdown.Item icon={<DetailIcon />} onClick={handleExportComplienceReport}>Reporte de cumplimiento</Dropdown.Item>
                                <Dropdown.Item icon={<DetailIcon />} onClick={handleExportMissingTablesReport}>Reporte de mesas faltantes</Dropdown.Item>
                            </Dropdown>
                        </div>
                        <div>
                            <div className='record__container'>
                                {data.length > 0 ? data.map((card) => {
                                    if (card.status !== 'APROBADO') {
                                        let totalVotesFavor = 0;

                                        if (card.votersData) {
                                            // eslint-disable-next-line
                                            for (const [key, value] of Object.entries(card.votersData)) {
                                                if (value?.isPrincipal === true) totalVotesFavor += Number(value.votes) || 0;
                                            }
                                        }
                                        return <RecordCard key={card.id} id={card.id} img={card?.img} witnessName={card.witnessId.name + " " + card.witnessId.surnames} witnessSite={card.witnessId.votingBoothInCharge} votes={totalVotesFavor} status={card.status} handleSuccess={handleSuccess} handleDecline={handleDecline} handleOpenDetail={handleOpenDetail} />

                                    } else {
                                        return null
                                    }
                                }) :
                                    <>
                                        <h3>No se encontraron nuevos registros por evaluar.</h3>
                                    </>}

                            </div>
                        </div>
                    </div>
                    <div className="container__component">
                        <div className="container__header">
                            <h4>Resultados preliminares</h4>
                        </div>
                        <div className="cards__container">
                            <Cards title="Total de votos a favor (APROBADOS)" number={stats?.totalvotesPrincipal || 0} icon={<HiOutlineClipboardCheck size={50} />} />
                            <h5>Total votos</h5>
                            <div className="cards__container__votes" style={{ display: 'flex', gap: 5 }}>
                                <Cards title="Anulados o nulos" number={stats?.totalNullVotes || 0} icon={<HiOutlineMinusCircle size={30} />} />
                                <Cards title="En blanco" number={stats?.totalWhiteVotes || 0} icon={<HiOutlineFlag size={30} />} />
                                <Cards title="No marcados" number={stats?.totalUnmarkedVotes || 0} icon={<HiOutlineXCircle size={30} />} />
                            </div>
                            <Cards title="Registros Aprobados" number={stats?.countStatus?.APROBADO || 0} icon={<HiOutlineDocumentAdd size={50} />} />
                            <Cards title="Registros Pendientes" number={stats?.countStatus?.PENDIENTE || 0} icon={<HiOutlineDocumentSearch size={50} />} />
                            <Cards title="Registros Rechazados" number={stats?.countStatus?.RECHAZADA || 0} icon={<HiOutlineDocumentRemove size={50} />} />
                        </div>
                    </div>
                </div>

            </div>
            <RecordModal open={openDetail} handleClose={handleCloseDetail} data={detailRecord} handleSuccess={handleSuccess} handleDecline={handleDecline} />

        </div>
    )
}

export default WitnessPage
