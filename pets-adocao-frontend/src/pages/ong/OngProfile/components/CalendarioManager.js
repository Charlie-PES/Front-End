import React, { useState } from 'react';
import { FaPlus, FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import styles from './CalendarioManager.module.css';

const CalendarioManager = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Feira de Adoção',
      date: '2024-04-15',
      time: '10:00',
      location: 'Praça Central',
      description: 'Evento para adoção de pets',
      participants: 15,
      type: 'adoção'
    },
    {
      id: 2,
      title: 'Campanha de Vacinação',
      date: '2024-04-20',
      time: '14:00',
      location: 'Clínica Veterinária',
      description: 'Campanha gratuita de vacinação',
      participants: 8,
      type: 'saúde'
    },
    // Adicione mais eventos aqui
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(selectedDate);

  const renderCalendar = () => {
    const days = [];
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    // Renderiza os dias da semana
    weekDays.forEach(day => {
      days.push(
        <div key={day} className={styles.weekDay}>
          {day}
        </div>
      );
    });

    // Renderiza os espaços vazios antes do primeiro dia do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay} />);
    }

    // Renderiza os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const dayEvents = events.filter(event => event.date === date.toISOString().split('T')[0]);

      days.push(
        <div
          key={day}
          className={`${styles.day} ${dayEvents.length > 0 ? styles.hasEvents : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <span className={styles.dayNumber}>{day}</span>
          {dayEvents.length > 0 && (
            <div className={styles.eventIndicator}>
              {dayEvents.length} evento(s)
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const getEventsForSelectedDate = () => {
    return events.filter(event => event.date === selectedDate.toISOString().split('T')[0]);
  };

  return (
    <div className={styles.calendarioManager}>
      <div className={styles.header}>
        <h2>Calendário de Eventos</h2>
        <button className={styles.addButton} onClick={() => setShowAddEvent(true)}>
          <FaPlus />
          <span>Novo Evento</span>
        </button>
      </div>

      <div className={styles.calendarioContainer}>
        <div className={styles.calendarioHeader}>
          <button
            className={styles.monthButton}
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setMonth(newDate.getMonth() - 1);
              setSelectedDate(newDate);
            }}
          >
            &lt;
          </button>
          <h3>
            {selectedDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
          </h3>
          <button
            className={styles.monthButton}
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setMonth(newDate.getMonth() + 1);
              setSelectedDate(newDate);
            }}
          >
            &gt;
          </button>
        </div>

        <div className={styles.calendarioGrid}>
          {renderCalendar()}
        </div>
      </div>

      <div className={styles.eventsList}>
        <h3>Eventos do Dia</h3>
        {getEventsForSelectedDate().map(event => (
          <div key={event.id} className={styles.eventCard}>
            <div className={styles.eventHeader}>
              <h4>{event.title}</h4>
              <span className={`${styles.eventType} ${styles[event.type]}`}>
                {event.type}
              </span>
            </div>
            <div className={styles.eventDetails}>
              <p>
                <FaCalendarAlt />
                {new Date(event.date).toLocaleDateString()} às {event.time}
              </p>
              <p>
                <FaMapMarkerAlt />
                {event.location}
              </p>
              <p>
                <FaUsers />
                {event.participants} participantes
              </p>
            </div>
            <p className={styles.eventDescription}>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarioManager; 