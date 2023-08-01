import './App.css';
import EmployeeContactTable from './components/contacts/EmployeeContactTable.js';
import CustomerContactTable from './components/contacts/CustomerContactTable.js';


function App() {
    return (
        <div className='App'>
            <EmployeeContactTable />
            <CustomerContactTable />
        </div>
    );
}

export default App;
