// import { useState } from 'react';
// import { Bell, Search, Trophy, Users, PlusCircle, BarChart2, Settings, HelpCircle, LogOut } from 'lucide-react';

// export default function CompetitionDashboard() {
//   const [competitions] = useState([
//     {
//       id: 1,
//       name: "Summer Code Challenge",
//       category: "Web Development",
//       date: "Aug 15, 2023",
//       participants: "24 / 30",
//       winner: "Team Innovators",
//       status: "COMPLETED",
//       icon: "💻"
//     },
//     {
//       id: 2,
//       name: "AI Hackathon",
//       category: "Machine Learning",
//       date: "Oct 10, 2023",
//       participants: "18 / 25",
//       winner: "-",
//       status: "UPCOMING",
//       icon: "🧠"
//     },
//     {
//       id: 3,
//       name: "UX Design Challenge",
//       category: "User Experience",
//       date: "Sep 5, 2023",
//       participants: "12 / 20",
//       winner: "-",
//       status: "REGISTRATION",
//       icon: "🎨"
//     },
//     {
//       id: 4,
//       name: "Mobile App Innovation",
//       category: "Mobile Development",
//       date: "Nov 20, 2023",
//       participants: "8 / 15",
//       winner: "-",
//       status: "REGISTRATION",
//       icon: "📱"
//     },
//     {
//       id: 5,
//       name: "Data Science Challenge",
//       category: "Data Analytics",
//       date: "Dec 1, 2023",
//       participants: "15 / 20",
//       winner: "-",
//       status: "UPCOMING",
//       icon: "📊"
//     },
//     {
//       id: 6,
//       name: "Cybersecurity Contest",
//       category: "Security",
//       date: "Jul 20, 2023",
//       participants: "20 / 25",
//       winner: "SecureTeam",
//       status: "COMPLETED",
//       icon: "🔒"
//     },
//     {
//       id: 7,
//       name: "Game Development Jam",
//       category: "Game Development",
//       date: "Jan 15, 2024",
//       participants: "10 / 15",
//       winner: "-",
//       status: "REGISTRATION",
//       icon: "🎮"
//     },
//     {
//       id: 8,
//       name: "IoT Innovation Challenge",
//       category: "Internet of Things",
//       date: "Feb 10, 2024",
//       participants: "6 / 12",
//       winner: "-",
//       status: "REGISTRATION",
//       icon: "🌐"
//     },
//     {
//       id: 9,
//       name: "Blockchain Hackathon",
//       category: "Blockchain",
//       date: "Jun 30, 2023",
//       participants: "16 / 20",
//       winner: "CryptoMasters",
//       status: "COMPLETED",
//       icon: "⛓️"
//     },
//     {
//       id: 10,
//       name: "Green Tech Challenge",
//       category: "Sustainability",
//       date: "Mar 5, 2024",
//       participants: "8 / 18",
//       winner: "-",
//       status: "UPCOMING",
//       icon: "🌱"
//     },
//     {
//       id: 11,
//       name: "VR/AR Experience Contest",
//       category: "Virtual Reality",
//       date: "Apr 20, 2024",
//       participants: "5 / 10",
//       winner: "-",
//       status: "REGISTRATION",
//       icon: "🥽"
//     },
//     {
//       id: 12,
//       name: "Cloud Computing Challenge",
//       category: "Cloud Technology",
//       date: "May 15, 2024",
//       participants: "12 / 16",
//       winner: "-",
//       status: "UPCOMING",
//       icon: "☁️"
//     }
//   ]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'COMPLETED':
//         return 'bg-green-100 text-green-800';
//       case 'UPCOMING':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'REGISTRATION':
//         return 'bg-orange-100 text-orange-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-56 bg-blue-600 text-white flex flex-col">
//         <div className="p-4 border-b border-blue-700">
//           <h1 className="text-xl font-bold">CompAdmin</h1>
//           <p className="text-sm text-blue-200">Competition Management</p>
//         </div>
        
//         <nav className="flex-1 p-4">
//           <ul className="space-y-2">
//             <li>
//               <a href="#" className="flex items-center p-2 rounded-lg bg-blue-700 hover:bg-blue-700">
//                 <Trophy className="w-5 h-5 mr-3" />
//                 <span>Competitions</span>
//               </a>
//             </li>
//             <li>
//               <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
//                 <Users className="w-5 h-5 mr-3" />
//                 <span>Group Management</span>
//               </a>
//             </li>
//             <li>
//               <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
//                 <PlusCircle className="w-5 h-5 mr-3" />
//                 <span>New Competition</span>
//               </a>
//             </li>
//             <li>
//               <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
//                 <BarChart2 className="w-5 h-5 mr-3" />
//                 <span>Analytics</span>
//               </a>
//             </li>
//             <li>
//               <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
//                 <Settings className="w-5 h-5 mr-3" />
//                 <span>Settings</span>
//               </a>
//             </li>
//             <li>
//               <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
//                 <HelpCircle className="w-5 h-5 mr-3" />
//                 <span>Help & Support</span>
//               </a>
//             </li>
//           </ul>
//         </nav>
        
//         <div className="p-4 mt-auto border-t border-blue-700">
//           <div className="flex items-center">
//             <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center">
//               JD
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium">John Doe</p>
//               <p className="text-xs text-blue-200">Admin</p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white shadow-sm">
//           <div className="flex items-center justify-between p-4">
//             <h2 className="text-xl font-semibold">Competitions</h2>
//             <div className="flex items-center">
//               <div className="relative">
//                 <input 
//                   type="text" 
//                   placeholder="Search..." 
//                   className="border rounded-lg py-2 px-4 pl-10 w-60"
//                 />
//                 <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
//               </div>
//               <button className="ml-4 p-2 rounded-full hover:bg-gray-100">
//                 <Bell className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
//           </div>
//         </header>
        
//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="mb-6 flex justify-between items-center">
//             <div>
//               <h3 className="text-lg font-semibold">All Competitions</h3>
//               <p className="text-sm text-gray-500">Manage your competition events</p>
//             </div>
//             <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
//               <PlusCircle className="w-4 h-4 mr-2" />
//               New Competition
//             </button>
//           </div>
          
//           {/* Filters */}
//           <div className="mb-6 flex items-center justify-between">
//             <div className="flex gap-4">
//               <div className="relative">
//                 <select className="border rounded-lg py-2 px-4 pr-8 appearance-none bg-white">
//                   <option>All Status</option>
//                   <option>Registration</option>
//                   <option>Upcoming</option>
//                   <option>Completed</option>
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </div>
              
//               <div className="relative">
//                 <select className="border rounded-lg py-2 px-4 pr-8 appearance-none bg-white">
//                   <option>All Categories</option>
//                   <option>Web Development</option>
//                   <option>Machine Learning</option>
//                   <option>Mobile Development</option>
//                   <option>Data Analytics</option>
//                   <option>Security</option>
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
            
//             <button className="flex items-center text-blue-500 border border-blue-500 rounded-lg px-3 py-1.5">
//               <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//               </svg>
//               Export
//             </button>
//           </div>
          
//           {/* Table */}
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Competition
//                   </th>
//                   <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Participants
//                   </th>
//                   <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Winner
//                   </th>
//                   <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {competitions.map((comp) => (
//                   <tr key={comp.id}>
//                     <td className="py-4 px-6 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
//                           {comp.icon}
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">{comp.name}</div>
//                           <div className="text-sm text-gray-500">{comp.category}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
//                       {comp.date}
//                     </td>
//                     <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
//                       {comp.participants}
//                     </td>
//                     <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
//                       {comp.winner}
//                     </td>
//                     <td className="py-4 px-6 whitespace-nowrap">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(comp.status)}`}>
//                         {comp.status}
//                       </span>
//                     </td>
//                     <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <button className="text-blue-600 hover:text-blue-900" title="View Participants">
//                           <Users className="w-4 h-4" />
//                         </button>
//                         <button className="text-blue-600 hover:text-blue-900" title="Edit">
//                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                           </svg>
//                         </button>
//                         <button className="text-red-600 hover:text-red-900" title="Delete">
//                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
            
//             {/* Summary Footer */}
//             <div className="py-3 px-6 bg-gray-50 border-t border-gray-200">
//               <div className="text-sm text-gray-600">
//                 Total: {competitions.length} competitions
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }