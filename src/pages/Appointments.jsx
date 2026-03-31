import React, { useState } from 'react';
import { Video, Calendar as CalIcon, Clock, User, Plus, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const Appointments = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const upcoming = [
    { id: 1, doc: "Dr. Sarah Chen", spec: "Cardiologist", date: "April 02, 2026", time: "10:30 AM", type: "Virtual" },
    { id: 2, doc: "Dr. James Wilson", spec: "General Physician", date: "April 05, 2026", time: "02:15 PM", type: "In-Person" },
  ];

  const past = [
    { date: "Mar 20, 2026", doc: "Dr. Emily Blunt", type: "Checkup", status: "Completed" },
    { date: "Mar 12, 2026", doc: "Dr. Sarah Chen", type: "Consultation", status: "Completed" },
    { date: "Feb 28, 2026", doc: "Dr. Amit Shah", type: "Lab Results", status: "Completed" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 font-['Inter'] flex flex-col lg:flex-row gap-8 bg-slate-50 min-h-screen">
      
      {/* Main Content Area */}
      <div className="flex-1">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800">Upcoming Appointments</h1>
          <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-teal-100">
            <Plus size={18} /> New Appointment
          </button>
        </header>

        {/* Upcoming Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {upcoming.map((apt) => (
            <div key={apt.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-teal-50 p-3 rounded-2xl text-teal-600">
                  <User size={24} />
                </div>
                {apt.type === "Virtual" && (
                  <span className="text-[10px] uppercase tracking-widest font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                    Virtual Visit
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-800">{apt.doc}</h3>
              <p className="text-teal-600 font-medium text-sm mb-4">{apt.spec}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <CalIcon size={14} /> {apt.date}
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock size={14} /> {apt.time}
                </div>
              </div>

              {apt.type === "Virtual" ? (
                <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-2xl font-bold hover:bg-teal-600 transition-colors">
                  <Video size={18} /> Join Video Call
                </button>
              ) : (
                <button className="w-full border-2 border-slate-100 text-slate-600 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-colors">
                  View Directions
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Past Appointments Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Past Appointments</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-sm border-b border-slate-50">
                  <th className="pb-4 font-medium">Date</th>
                  <th className="pb-4 font-medium">Doctor</th>
                  <th className="pb-4 font-medium">Type</th>
                  <th className="pb-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {past.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 text-sm font-semibold text-slate-700">{item.date}</td>
                    <td className="py-4 text-sm text-slate-600">{item.doc}</td>
                    <td className="py-4 text-sm text-slate-500">{item.type}</td>
                    <td className="py-4">
                      <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                        <CheckCircle size={14} /> {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sidebar Calendar */}
      <aside className="w-full lg:w-80 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 h-fit">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800">April 2026</h3>
          <div className="flex gap-2">
            <ChevronLeft size={18} className="text-slate-400 cursor-pointer hover:text-teal-600" />
            <ChevronRight size={18} className="text-slate-400 cursor-pointer hover:text-teal-600" />
          </div>
        </div>
        
        {/* Simple Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs mb-4">
          {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-slate-300 font-bold">{d}</span>)}
          {Array.from({length: 30}).map((_, i) => (
            <div key={i} className={`py-2 rounded-lg cursor-pointer transition-all hover:bg-teal-50 relative
              ${i + 1 === 2 ? 'bg-teal-600 text-white font-bold' : 'text-slate-600'}`}>
              {i + 1}
              {(i === 1 || i === 4) && ! (i + 1 === 2) && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-400 rounded-full"></span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Today's Tip</p>
          <p className="text-xs text-slate-600 leading-relaxed">Drink 8 glasses of water today to maintain optimal hydration levels.</p>
        </div>
      </aside>
    </div>
  );
};

export default Appointments;