import { useEffect, useState } from "react";
import "./Report.scss";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from 'date-fns';

function Report() {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/teachersAll/`);
                setTeachers(response.data);
            } catch (error) {
                console.log("Ошибка получения данных о преподавателях");
            }
        };
        fetchTeachers();
    }, []);

    const TeacherChange = (e) => {
        const selectedTeacherId = e.target.value;
        setSelectedTeacher(teachers.find(teacher => teacher.id === parseInt(selectedTeacherId)));
        fetchSchedule(selectedTeacherId);
    };

    const fetchSchedule = async (teacherId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/teacher-schedule/${teacherId}/`);
            setSchedule(response.data);
        } catch (error) {
            console.log("Ошибка получения расписания преподавателя");
        }
    };

    const generatePDF = () => {
        const input = document.getElementById('schedule');
        input.style.display = 'block';

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('schedule_report.pdf');
        });

        input.style.display = 'none';
    };

    return (
        <>
            <div className="Report">
                <h2 className="Report__title">Формирование отчета о занятиях преподавателя</h2>
                <div className="Report__content">
                    <div className="Report__content1">
                        <select className="Report__select" onChange={TeacherChange}>
                            <option value="">Выберите преподавателя</option>
                            {teachers.map(teacher => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.lastname} {teacher.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="Report__btn" onClick={generatePDF}>Создать PDF</button>
                </div>
                <div id="schedule" style={{ padding: '20px', backgroundColor: '#fff', display: 'none', width: "500px" }}>
                    <h4>Расписание занятий: {selectedTeacher ? `${selectedTeacher.lastname} ${selectedTeacher.name}` : ''}</h4>
                    <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th className="Report__th">Дата</th>
                                <th className="Report__th">Время</th>
                                <th className="Report__th">Мастер-класс</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.map((item, index) => (
                                <tr key={index}>
                                    <td className="Report__td">{format(new Date(item.date), 'dd.MM.yyyy')}</td>
                                    <td className="Report__td">{format(new Date(`${item.date}T${item.time}`), 'HH:mm')}</td>
                                    <td className="Report__td">{item.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Report;
