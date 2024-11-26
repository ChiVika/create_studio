import React, { useEffect, useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ScheduleReport = ({ teacherId }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios.get(`/api/teacher-schedule/${teacherId}/`)
      .then(response => setSchedule(response.data))
      .catch(error => console.error('Error fetching schedule:', error));
  }, [teacherId]);

  const generatePDF = () => {
    const input = document.getElementById('schedule');
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
  };

  return (
    <div>
      <button onClick={generatePDF}>Создать PDF</button>
      <div id="schedule" style={{ padding: '20px', backgroundColor: '#fff' }}>
        <h1>Расписание занятий преподавателя</h1>
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Время</th>
              <th>Заголовок</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleReport;