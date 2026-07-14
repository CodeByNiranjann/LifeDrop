// import { NavLink, useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const DashboardSidebar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <aside className="dashboard-sidebar">
//       <div className="dashboard-sidebar-profile">
//         <div className="dashboard-sidebar-avatar">
//           {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
//         </div>
//         <h4 className="dashboard-sidebar-name">{user?.name}</h4>
//         <span className="dashboard-sidebar-bloodgroup">{user?.bloodGroup}</span>
//       </div>

//       <nav className="dashboard-sidebar-nav">
//         <NavLink
//           to="/dashboard"
//           end
//           className={({ isActive }) =>
//             `dashboard-sidebar-link ${isActive ? 'dashboard-sidebar-link-active' : ''}`
//           }
//         >
//           <span className="dashboard-sidebar-icon">📊</span>
//           Overview
//         </NavLink>
//         <NavLink
//           to="/profile"
//           className={({ isActive }) =>
//             `dashboard-sidebar-link ${isActive ? 'dashboard-sidebar-link-active' : ''}`
//           }
//         >
//           <span className="dashboard-sidebar-icon">👤</span>
//           My Profile
//         </NavLink>
//         <NavLink
//           to="/edit-profile"
//           className={({ isActive }) =>
//             `dashboard-sidebar-link ${isActive ? 'dashboard-sidebar-link-active' : ''}`
//           }
//         >
//           <span className="dashboard-sidebar-icon">✏️</span>
//           Edit Profile
//         </NavLink>
//         <NavLink
//           to="/search-donor"
//           className={({ isActive }) =>
//             `dashboard-sidebar-link ${isActive ? 'dashboard-sidebar-link-active' : ''}`
//           }
//         >
//           <span className="dashboard-sidebar-icon">🔍</span>
//           Find Donors
//         </NavLink>
//         <NavLink
//           to="/blood-request"
//           className={({ isActive }) =>
//             `dashboard-sidebar-link ${isActive ? 'dashboard-sidebar-link-active' : ''}`
//           }
//         >
//           <span className="dashboard-sidebar-icon">🩸</span>
//           Blood Requests
//         </NavLink>
//       </nav>

//       <button className="btn btn-outline dashboard-sidebar-logout" onClick={handleLogout}>
//         Logout
//       </button>
//     </aside>
//   );
// };

// export default DashboardSidebar;

import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DashboardSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const isDonor = user?.role === 'Donor';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar-profile">
        <div className="dashboard-sidebar-avatar">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <h4 className="dashboard-sidebar-name">{user?.name}</h4>
        {isDonor ? (
          <span className="dashboard-sidebar-bloodgroup">{user?.bloodGroup}</span>
        ) : (
          <span className="dashboard-sidebar-role-badge">Seeker</span>
        )}
      </div>

      <nav className="dashboard-sidebar-nav">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `dashboard-sidebar-link ${isActive ? 'dashboard-sidebar-link-active' : ''}`
          }
        >
          <span className="dashboard-sidebar-icon">📊</span>
          Overview
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `dashboard-sidebar-link ${isActive ? 'dashboard-sidebar-link-active' : ''}`
          }
        >
          <span className="dashboard-sidebar-icon">👤</span>
          My Profile
        </NavLink>
        <NavLink
          to="/edit-profile"
          className={({ isActive }) =>
            `dashboard-sidebar-link ${isActive ? 'dashboard-sidebar-link-active' : ''}`
          }
        >
          <span className="dashboard-sidebar-icon">✏️</span>
          Edit Profile
        </NavLink>
        <NavLink
          to="/search-donor"
          className={({ isActive }) =>
            `dashboard-sidebar-link ${isActive ? 'dashboard-sidebar-link-active' : ''}`
          }
        >
          <span className="dashboard-sidebar-icon">🔍</span>
          Find Donors
        </NavLink>
        <NavLink
          to="/blood-request"
          className={({ isActive }) =>
            `dashboard-sidebar-link ${isActive ? 'dashboard-sidebar-link-active' : ''}`
          }
        >
          <span className="dashboard-sidebar-icon">🩸</span>
          Blood Requests
        </NavLink>
      </nav>

      <button className="btn btn-outline dashboard-sidebar-logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
};

export default DashboardSidebar;