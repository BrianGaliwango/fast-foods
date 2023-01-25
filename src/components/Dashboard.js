import Header from './Header';
import Search from './Search';
import UserMenu from './UserMenu';

const Dashboard = () => {
  return (
    <div className='mainDashboardContainer'>  
      <Header />
      <Search />
      <UserMenu />      
    </div>    
  )
}

export default Dashboard